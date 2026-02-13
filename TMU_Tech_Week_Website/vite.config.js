import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Custom Vite plugin that runs the serverless function locally during dev.
// This ensures the same field-mapping and API-key injection logic runs
// in both dev (`npm run dev`) and production (Vercel serverless).
function boardyApiPlugin(env) {
  return {
    name: 'boardy-api-proxy',
    configureServer(server) {
      server.middlewares.use('/api/boardy', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ error: 'Method not allowed' }))
        }

        // Parse the JSON body from the incoming request
        const body = await new Promise((resolve, reject) => {
          let data = ''
          req.on('data', (chunk) => (data += chunk))
          req.on('end', () => {
            try { resolve(JSON.parse(data)) }
            catch { reject(new Error('Invalid JSON')) }
          })
          req.on('error', reject)
        })

        const apiKey = env.BOARDY_API_KEY
        const communityId = env.BOARDY_COMMUNITY_ID
        const apiUrl = env.BOARDY_API_URL

        if (!apiKey || !communityId || !apiUrl) {
          console.error('Missing BOARDY_API_KEY, BOARDY_COMMUNITY_ID, or BOARDY_API_URL env vars')
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ error: 'Server configuration error.' }))
        }

        try {
          const { name, email, phone, linkedin } = body

          if (!email || !phone) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            return res.end(JSON.stringify({ error: 'Email and phone are required.' }))
          }

          // Split full name into firstName / lastName
          const nameParts = (name || '').trim().split(/\s+/)
          const firstName = nameParts[0] || ''
          const lastName = nameParts.slice(1).join(' ') || ''

          // Build the Boardy API request body
          const boardyPayload = {
            phone,
            email,
            firstName,
            lastName,
            communityId,
            sendVerificationMessage: false,
            linkedInUrl: linkedin || undefined,
            extraData: {
              eventName: 'TMU Tech Week 2025',
              source: 'website-form',
            },
          }

          const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'boardy-api-key': apiKey,
            },
            body: JSON.stringify(boardyPayload),
          })

          const responseData = await apiResponse.json().catch(() => ({}))

          if (!apiResponse.ok) {
            console.error('Boardy API error:', apiResponse.status, responseData)
            res.statusCode = apiResponse.status
            res.setHeader('Content-Type', 'application/json')
            return res.end(JSON.stringify({
              error: responseData.message || 'Something went wrong. Please try again.',
            }))
          }

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ success: true }))
        } catch (err) {
          console.error('Proxy error:', err)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ error: 'Something went wrong. Please try again.' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load all env vars (including non-VITE_ prefixed ones) for the server plugin
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: '/',
    plugins: [react(), boardyApiPlugin(env)],
  }
})

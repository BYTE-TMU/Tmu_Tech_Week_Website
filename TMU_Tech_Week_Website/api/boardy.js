// Vercel Serverless Function — proxies form submissions to the Boardy Onboarding API.
// The API key and endpoint never leave the server.

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.BOARDY_API_KEY;
    const communityId = process.env.BOARDY_COMMUNITY_ID;
    const apiUrl = process.env.BOARDY_API_URL;

    if (!apiKey || !communityId || !apiUrl) {
        console.error('Missing BOARDY_API_KEY, BOARDY_COMMUNITY_ID, or BOARDY_API_URL env vars');
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    try {
        const { name, email, phone, linkedin } = req.body;

        // Validate required fields
        if (!email || !phone) {
            return res.status(400).json({
                error: 'Email and phone are required.',
            });
        }

        // Split full name into firstName / lastName
        const nameParts = (name || '').trim().split(/\s+/);
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        // Build the Boardy API request body
        const boardyPayload = {
            phone,           // Already in E.164 format from the front-end
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
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'boardy-api-key': apiKey,
            },
            body: JSON.stringify(boardyPayload),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            console.error('Boardy API error:', response.status, data);
            return res.status(response.status).json({
                error: data.message || 'Something went wrong. Please try again.',
            });
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Proxy error:', err);
        return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
}

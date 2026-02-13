import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import EventCalendar from './components/EventCalendar'
import Speakers from './components/Speakers'
import Partners from './components/Partners'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import BoardyForm from './components/BoardyForm'
import Footer from './components/Footer'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <EventCalendar />
        <Speakers />
        <Partners />
        <FAQ />
        <Contact />
        <BoardyForm />
      </main>
      <Footer />
      <Analytics />
    </div>
  )
}

export default App

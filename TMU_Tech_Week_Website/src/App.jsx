import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import EventCalendar from './components/EventCalendar'
import Partners from './components/Partners'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <EventCalendar />
        <Partners />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App

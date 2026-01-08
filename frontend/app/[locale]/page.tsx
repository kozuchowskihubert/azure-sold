import { useTranslations } from 'next-intl'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Calculator from '@/components/sections/Calculator'
import Portfolio from '@/components/sections/Portfolio'
import Contact from '@/components/sections/Contact'

export default function HomePage() {
  const t = useTranslations()

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      <Hero />
      
      <Services />
      
      <section id="calculator" className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
        <Calculator />
      </section>
      
      <section id="portfolio" className="py-20">
        <Portfolio />
      </section>
      
      <section id="contact" className="py-20 bg-gray-50">
        <Contact />
      </section>
      
      <Footer />
    </main>
  )
}

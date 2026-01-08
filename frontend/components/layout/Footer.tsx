'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Sun, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

export default function Footer() {
  const t = useTranslations('footer')
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    services: [
      { label: 'Instalacje domowe', href: '#services' },
      { label: 'Instalacje biznesowe', href: '#services' },
      { label: 'Serwis i konserwacja', href: '#services' },
      { label: 'Magazyny energii', href: '#services' },
      { label: 'Pompy ciepła', href: '#services' }
    ],
    company: [
      { label: 'O nas', href: '#about' },
      { label: 'Realizacje', href: '#portfolio' },
      { label: 'Zespół', href: '#team' },
      { label: 'Kariera', href: '#career' },
      { label: 'Kontakt', href: '#contact' }
    ],
    resources: [
      { label: 'Kalkulator oszczędności', href: '#calculator' },
      { label: 'Blog', href: '/blog' },
      { label: 'Pytania i odpowiedzi', href: '/faq' },
      { label: 'Dotacje i finansowanie', href: '/financing' },
      { label: 'Certyfikaty', href: '/certificates' }
    ],
    legal: [
      { label: 'Polityka prywatności', href: '/privacy' },
      { label: 'Regulamin', href: '/terms' },
      { label: 'RODO', href: '/gdpr' },
      { label: 'Cookies', href: '/cookies' }
    ]
  }
  
  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' }
  ]
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-12 h-12 bg-gradient-solar rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sun className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="font-bold text-2xl text-white">
                  Azure <span className="text-orange-400">Solar</span>
                </div>
                <div className="text-xs text-gray-400">
                  Energia słońca dla Ciebie
                </div>
              </div>
            </Link>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Jesteśmy liderem w branży fotowoltaicznej z ponad 15-letnim doświadczeniem. 
              Wykonaliśmy ponad 500 instalacji, pomagając klientom oszczędzać i dbać o środowisko.
            </p>
            
            <div className="space-y-3">
              <a href="tel:+48123456789" className="flex items-center gap-3 hover:text-orange-400 transition-colors">
                <Phone className="w-5 h-5" />
                <span>+48 123 456 789</span>
              </a>
              <a href="mailto:kontakt@azure-solar.pl" className="flex items-center gap-3 hover:text-orange-400 transition-colors">
                <Mail className="w-5 h-5" />
                <span>kontakt@azure-solar.pl</span>
              </a>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-orange-400 transition-colors">
                <MapPin className="w-5 h-5" />
                <span>ul. Słoneczna 1, 00-001 Warszawa</span>
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-solar transition-all group"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                )
              })}
            </div>
          </div>
          
          {/* Services Links */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">
              Usługi
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-orange-400 transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">
              Firma
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-orange-400 transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources Links */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">
              Zasoby
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-orange-400 transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Newsletter Section */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="font-bold text-white text-xl mb-2">
                📧 Newsletter
              </h3>
              <p className="text-gray-400">
                Otrzymuj najnowsze informacje o fotowoltaice, dotacjach i promocjach.
              </p>
            </div>
            
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Twój adres email"
                required
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Zapisz się
              </button>
            </form>
          </div>
        </div>
        
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-b border-gray-800">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">500+</div>
            <div className="text-sm text-gray-400">Instalacji</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">15+</div>
            <div className="text-sm text-gray-400">Lat doświadczenia</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">98%</div>
            <div className="text-sm text-gray-400">Zadowolonych klientów</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">24/7</div>
            <div className="text-sm text-gray-400">Wsparcie techniczne</div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © {currentYear} Azure Solar. Wszystkie prawa zastrzeżone.
            </div>
            
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

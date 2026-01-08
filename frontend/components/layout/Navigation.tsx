'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sun, Menu, X, User, Settings } from 'lucide-react'

export default function Navigation() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navLinks = [
    { href: '#services', label: t('services') },
    { href: '#calculator', label: t('calculator') },
    { href: '#portfolio', label: t('portfolio') },
    { href: '#about', label: t('about') },
    { href: '#contact', label: t('contact') }
  ]
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-lg py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-gradient-solar rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-xl text-gray-900">
                Azure <span className="text-orange-500">Solar</span>
              </div>
              <div className="text-xs text-gray-600 -mt-1">
                Energia słońca dla Ciebie
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors hover:text-orange-500 ${
                  isScrolled ? 'text-gray-700' : 'text-gray-900'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/client/login"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-orange-500 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">{t('clientPanel')}</span>
            </Link>
            
            <Link 
              href="/admin/login"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-orange-500 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">{t('adminPanel')}</span>
            </Link>
            
            <Link 
              href="#contact"
              className="btn-primary"
            >
              ☀️ {t('getQuote')}
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-6 space-y-4 animate-slide-up">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-gray-700 hover:text-orange-500 font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <Link 
                href="/client/login"
                className="flex items-center gap-2 py-2 text-gray-700 hover:text-orange-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">{t('clientPanel')}</span>
              </Link>
              
              <Link 
                href="/admin/login"
                className="flex items-center gap-2 py-2 text-gray-700 hover:text-orange-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">{t('adminPanel')}</span>
              </Link>
              
              <Link 
                href="#contact"
                className="btn-primary w-full text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ☀️ {t('getQuote')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

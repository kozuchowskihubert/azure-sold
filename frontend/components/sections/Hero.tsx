'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Sun, Zap, TrendingDown, Leaf } from 'lucide-react'

export default function Hero() {
  const t = useTranslations('hero')
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-pattern">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 -z-10" />
      
      {/* Solar grid pattern */}
      <div className="absolute inset-0 solar-grid opacity-30 -z-10" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-400/20 rounded-full blur-3xl animate-pulse-slow" />
      
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="text-center lg:text-left space-y-8 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow-md">
              <Sun className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-semibold text-gray-700">
                Czista energia dla Twojego domu
              </span>
            </div>
            
            {/* Main heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-gray-900">{t('title').split(' ').slice(0, 2).join(' ')}</span>
              <br />
              <span className="bg-gradient-solar bg-clip-text text-transparent">
                {t('title').split(' ').slice(2).join(' ')}
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
              {t('subtitle')}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="#contact"
                className="btn-primary text-lg px-8 py-4"
              >
                ☀️ {t('cta')}
              </Link>
              
              <Link 
                href="#calculator"
                className="btn-secondary text-lg px-8 py-4"
              >
                🔢 {t('ctaSecondary')}
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold bg-gradient-solar bg-clip-text text-transparent">
                  500+
                </div>
                <div className="text-sm text-gray-600">Instalacji</div>
              </div>
              
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold bg-gradient-blue bg-clip-text text-transparent">
                  15+
                </div>
                <div className="text-sm text-gray-600">Lat doświadczenia</div>
              </div>
              
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold bg-gradient-solar bg-clip-text text-transparent">
                  98%
                </div>
                <div className="text-sm text-gray-600">Zadowolonych klientów</div>
              </div>
            </div>
          </div>
          
          {/* Right column - Visual */}
          <div className="relative animate-slide-up animation-delay-200">
            <div className="relative">
              {/* Main image placeholder - replace with actual image */}
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-orange-400 to-yellow-500 shadow-solar relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sun className="w-64 h-64 text-white/20" />
                </div>
                
                {/* Floating stats cards */}
                <div className="absolute top-8 right-8 bg-white rounded-xl shadow-xl p-4 animate-pulse-slow">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingDown className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">-65%</div>
                      <div className="text-xs text-gray-600">Rachunki</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-8 left-8 bg-white rounded-xl shadow-xl p-4 animate-pulse-slow animation-delay-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">12kW</div>
                      <div className="text-xs text-gray-600">Średnia moc</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-1/2 -left-4 bg-white rounded-xl shadow-xl p-4 animate-pulse-slow animation-delay-600">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">-8.5t</div>
                      <div className="text-xs text-gray-600">CO₂/rok</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full blur-2xl opacity-50" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-400 rounded-full blur-2xl opacity-50" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-gray-400 rounded-full" />
        </div>
      </div>
    </section>
  )
}

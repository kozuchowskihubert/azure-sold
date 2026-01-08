'use client'

import { useTranslations } from 'next-intl'
import { Sun, Home, Building2, Cog, Leaf, Euro, Clock } from 'lucide-react'

export default function Services() {
  const t = useTranslations('services')
  
  const services = [
    {
      icon: Home,
      title: t('residential.title'),
      description: t('residential.description'),
      features: [
        'Montaż paneli fotowoltaicznych',
        'Magazyny energii (baterie)',
        'Pompy ciepła',
        'Ładowarki do samochodów elektrycznych'
      ],
      color: 'orange'
    },
    {
      icon: Building2,
      title: t('commercial.title'),
      description: t('commercial.description'),
      features: [
        'Instalacje dachowe i gruntowe',
        'Systemy monitoringu',
        'Optymalizacja zużycia',
        'Kompleksowa obsługa'
      ],
      color: 'blue'
    },
    {
      icon: Cog,
      title: t('maintenance.title'),
      description: t('maintenance.description'),
      features: [
        'Przeglądy techniczne',
        'Czyszczenie paneli',
        'Naprawa usterek',
        'Serwis gwarancyjny'
      ],
      color: 'green'
    }
  ]
  
  const benefits = [
    {
      icon: Leaf,
      title: 'Ekologia',
      description: 'Redukuj emisję CO₂ i dbaj o środowisko',
      stat: '-8.5t',
      statLabel: 'CO₂/rok'
    },
    {
      icon: Euro,
      title: 'Oszczędności',
      description: 'Obniż rachunki za prąd nawet o 65%',
      stat: '-65%',
      statLabel: 'Rachunki'
    },
    {
      icon: Clock,
      title: 'Zwrot inwestycji',
      description: 'Szybki zwrot dzięki programom dotacji',
      stat: '5-7 lat',
      statLabel: 'ROI'
    }
  ]
  
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
          <Sun className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-semibold text-blue-600">
            Nasze usługi
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t('title')}
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>
      
      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {services.map((service, index) => {
          const Icon = service.icon
          const colorClasses = {
            orange: {
              gradient: 'from-orange-500 to-yellow-500',
              bg: 'bg-orange-100',
              text: 'text-orange-600',
              hover: 'hover:border-orange-500'
            },
            blue: {
              gradient: 'from-blue-500 to-cyan-500',
              bg: 'bg-blue-100',
              text: 'text-blue-600',
              hover: 'hover:border-blue-500'
            },
            green: {
              gradient: 'from-green-500 to-emerald-500',
              bg: 'bg-green-100',
              text: 'text-green-600',
              hover: 'hover:border-green-500'
            }
          }[service.color] || {
            gradient: 'from-gray-500 to-gray-600',
            bg: 'bg-gray-100',
            text: 'text-gray-600',
            hover: 'hover:border-gray-500'
          }
          
          return (
            <div 
              key={index}
              className={`card p-8 border-2 border-transparent ${colorClasses.hover} transition-all duration-300 hover:shadow-xl group animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 ${colorClasses.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-8 h-8 ${colorClasses.text}`} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>
              
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={`text-lg ${colorClasses.text}`}>✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`mt-8 w-full py-3 bg-gradient-to-r ${colorClasses.gradient} text-white font-semibold rounded-lg hover:shadow-lg transition-all`}>
                Dowiedz się więcej
              </button>
            </div>
          )
        })}
      </div>
      
      {/* Benefits Section */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dlaczego fotowoltaika?
          </h3>
          <p className="text-lg text-gray-600">
            Inwestycja, która się opłaca
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-all animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-solar rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h4>
                
                <p className="text-gray-600 mb-4">
                  {benefit.description}
                </p>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-3xl font-bold bg-gradient-solar bg-clip-text text-transparent">
                    {benefit.stat}
                  </div>
                  <div className="text-sm text-gray-600">
                    {benefit.statLabel}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="mt-12 text-center">
        <a 
          href="#calculator"
          className="inline-flex items-center gap-2 btn-primary text-lg px-8 py-4"
        >
          <Sun className="w-6 h-6" />
          Oblicz swoje oszczędności
        </a>
      </div>
    </div>
  )
}

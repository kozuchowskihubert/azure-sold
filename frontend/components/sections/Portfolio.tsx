'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import Image from 'next/image'

export default function Portfolio() {
  const t = useTranslations('portfolio')
  const [activeFilter, setActiveFilter] = useState('all')
  
  const filters = [
    { id: 'all', label: 'Wszystkie' },
    { id: 'residential', label: 'Dom jednorodzinny' },
    { id: 'commercial', label: 'Biznes' },
    { id: 'industrial', label: 'Przemysł' }
  ]
  
  const projects = [
    {
      id: 1,
      title: 'Instalacja domowa 8kW',
      category: 'residential',
      location: 'Warszawa',
      power: '8 kW',
      savings: '4,500 PLN/rok',
      image: '/placeholder-house.jpg',
      description: 'Nowoczesna instalacja fotowoltaiczna na domu jednorodzinnym z magazynem energii.'
    },
    {
      id: 2,
      title: 'Farma solarna 50kW',
      category: 'commercial',
      location: 'Poznań',
      power: '50 kW',
      savings: '28,000 PLN/rok',
      image: '/placeholder-commercial.jpg',
      description: 'Instalacja dachowa na budynku biurowym z systemem monitoringu.'
    },
    {
      id: 3,
      title: 'Instalacja przemysłowa 150kW',
      category: 'industrial',
      location: 'Wrocław',
      power: '150 kW',
      savings: '85,000 PLN/rok',
      image: '/placeholder-industrial.jpg',
      description: 'Duża instalacja gruntowa dla zakładu produkcyjnego.'
    },
    {
      id: 4,
      title: 'Willa z basenem 12kW',
      category: 'residential',
      location: 'Kraków',
      power: '12 kW',
      savings: '6,800 PLN/rok',
      image: '/placeholder-villa.jpg',
      description: 'Instalacja premium z pompą ciepła i ładowarką samochodową.'
    },
    {
      id: 5,
      title: 'Centrum handlowe 80kW',
      category: 'commercial',
      location: 'Gdańsk',
      power: '80 kW',
      savings: '45,000 PLN/rok',
      image: '/placeholder-mall.jpg',
      description: 'Kompleksowa instalacja z optymalizacją zużycia energii.'
    },
    {
      id: 6,
      title: 'Dom energooszczędny 10kW',
      category: 'residential',
      location: 'Łódź',
      power: '10 kW',
      savings: '5,600 PLN/rok',
      image: '/placeholder-eco.jpg',
      description: 'Instalacja zintegrowana z systemem smart home.'
    }
  ]
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter)
  
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
          <ExternalLink className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-semibold text-purple-600">
            Nasze realizacje
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t('title')}
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeFilter === filter.id
                ? 'bg-gradient-solar text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <div 
            key={project.id}
            className="card p-0 overflow-hidden group hover:shadow-2xl transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Image */}
            <div className="relative h-64 bg-gradient-to-br from-orange-100 to-yellow-100 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">
                    {project.category === 'residential' && '🏠'}
                    {project.category === 'commercial' && '🏢'}
                    {project.category === 'industrial' && '🏭'}
                  </div>
                  <div className="text-sm text-gray-600">Zdjęcie projektu</div>
                </div>
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-sm font-semibold text-gray-900">
                {filters.find(f => f.id === project.category)?.label}
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-solar opacity-0 group-hover:opacity-90 transition-opacity flex items-center justify-center">
                <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <ExternalLink className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-semibold">Zobacz szczegóły</p>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {project.title}
              </h3>
              
              <p className="text-gray-600 mb-4 text-sm">
                {project.description}
              </p>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <span>📍</span>
                <span>{project.location}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Moc</div>
                  <div className="font-bold text-orange-600">{project.power}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Oszczędności</div>
                  <div className="font-bold text-green-600">{project.savings}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* No Results */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Brak projektów w tej kategorii
          </h3>
          <p className="text-gray-600">
            Wybierz inną kategorię, aby zobaczyć nasze realizacje
          </p>
        </div>
      )}
      
      {/* CTA Section */}
      <div className="mt-16 bg-gradient-to-br from-blue-50 to-orange-50 rounded-3xl p-8 md:p-12 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Dołącz do zadowolonych klientów
        </h3>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Ponad 500 instalacji wykonanych z najwyższą jakością. Twój dom może być następny!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#calculator" className="btn-primary text-lg px-8 py-4">
            🔢 Oblicz oszczędności
          </a>
          <a href="#contact" className="btn-secondary text-lg px-8 py-4">
            📞 Umów bezpłatną konsultację
          </a>
        </div>
        
        <div className="grid grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-solar bg-clip-text text-transparent mb-1">
              500+
            </div>
            <div className="text-sm text-gray-600">Zrealizowanych projektów</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-solar bg-clip-text text-transparent mb-1">
              98%
            </div>
            <div className="text-sm text-gray-600">Zadowolonych klientów</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-solar bg-clip-text text-transparent mb-1">
              15+
            </div>
            <div className="text-sm text-gray-600">Lat doświadczenia</div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Calculator as CalcIcon, Sun, Euro, TrendingUp, Leaf } from 'lucide-react'

export default function Calculator() {
  const t = useTranslations('calculator')
  const [formData, setFormData] = useState({
    monthlyBill: '',
    roofArea: '',
    roofType: 'pitched',
    location: 'warszawa'
  })
  
  const [results, setResults] = useState<any>(null)
  const [calculating, setCalculating] = useState(false)
  
  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setCalculating(true)
    
    // Simulate calculation (replace with actual API call)
    setTimeout(() => {
      const monthlyBill = parseFloat(formData.monthlyBill) || 0
      const roofArea = parseFloat(formData.roofArea) || 0
      
      // Simple calculation algorithm
      const systemPower = Math.floor(roofArea / 6) // ~6m² per 1kW
      const annualProduction = systemPower * 1100 // ~1100 kWh per kW per year in Poland
      const annualSavings = monthlyBill * 12 * 0.65 // 65% savings
      const systemCost = systemPower * 4500 // ~4500 PLN per kW
      const roi = systemCost / annualSavings
      const co2Reduction = annualProduction * 0.8 // 0.8 kg CO2 per kWh
      
      setResults({
        systemPower: systemPower.toFixed(1),
        annualProduction: annualProduction.toFixed(0),
        annualSavings: annualSavings.toFixed(0),
        systemCost: systemCost.toFixed(0),
        roi: roi.toFixed(1),
        co2Reduction: (co2Reduction / 1000).toFixed(1)
      })
      
      setCalculating(false)
    }, 1000)
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4">
          <CalcIcon className="w-5 h-5 text-orange-600" />
          <span className="text-sm font-semibold text-orange-600">
            Bezpłatna kalkulacja
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t('title')}
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="card p-8">
            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  💰 {t('monthlyBill')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="monthlyBill"
                    value={formData.monthlyBill}
                    onChange={handleChange}
                    placeholder="500"
                    required
                    min="0"
                    step="10"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    PLN
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Podaj miesięczne zużycie energii elektrycznej
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📐 {t('roofArea')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="roofArea"
                    value={formData.roofArea}
                    onChange={handleChange}
                    placeholder="50"
                    required
                    min="10"
                    step="1"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    m²
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Dostępna powierzchnia dachu
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🏠 {t('roofType')}
                </label>
                <select
                  name="roofType"
                  value={formData.roofType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                >
                  <option value="pitched">Dach skośny</option>
                  <option value="flat">Dach płaski</option>
                  <option value="hip">Dach kopertowy</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📍 {t('location')}
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                >
                  <option value="warszawa">Warszawa</option>
                  <option value="krakow">Kraków</option>
                  <option value="wroclaw">Wrocław</option>
                  <option value="poznan">Poznań</option>
                  <option value="gdansk">Gdańsk</option>
                  <option value="other">Inne</option>
                </select>
              </div>
              
              <button
                type="submit"
                disabled={calculating}
                className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {calculating ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Obliczanie...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <CalcIcon className="w-5 h-5" />
                    {t('calculate')}
                  </span>
                )}
              </button>
            </form>
          </div>
          
          {/* Results */}
          <div className="space-y-6">
            {results ? (
              <>
                <div className="card p-8 bg-gradient-solar text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {t('results.title')}
                  </h3>
                  <p className="text-white/90 mb-6">
                    Potencjalne oszczędności dla Twojego domu
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/20 backdrop-blur rounded-lg">
                      <div className="flex items-center gap-3">
                        <Euro className="w-8 h-8" />
                        <div>
                          <div className="text-sm opacity-90">Roczne oszczędności</div>
                          <div className="text-3xl font-bold">{results.annualSavings} PLN</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white/20 backdrop-blur rounded-lg">
                      <div className="flex items-center gap-3">
                        <Sun className="w-8 h-8" />
                        <div>
                          <div className="text-sm opacity-90">Moc instalacji</div>
                          <div className="text-3xl font-bold">{results.systemPower} kW</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="card p-6 text-center">
                    <TrendingUp className="w-10 h-10 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{results.roi} lat</div>
                    <div className="text-sm text-gray-600">Zwrot inwestycji</div>
                  </div>
                  
                  <div className="card p-6 text-center">
                    <Leaf className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{results.co2Reduction}t</div>
                    <div className="text-sm text-gray-600">Mniej CO₂/rok</div>
                  </div>
                </div>
                
                <div className="card p-6 bg-blue-50 border-2 border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-2">
                    💡 Szacunkowy koszt instalacji
                  </h4>
                  <p className="text-3xl font-bold text-blue-900 mb-2">
                    {parseInt(results.systemCost).toLocaleString()} PLN
                  </p>
                  <p className="text-sm text-blue-700">
                    * Cena zawiera montaż i uruchomienie
                  </p>
                  <p className="text-sm text-blue-700">
                    * Możliwość dotacji do 50% kosztów
                  </p>
                </div>
                
                <button className="w-full btn-secondary text-lg py-4">
                  📄 Pobierz szczegółową ofertę
                </button>
              </>
            ) : (
              <div className="card p-12 text-center">
                <CalcIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Wypełnij formularz
                </h3>
                <p className="text-gray-600">
                  Podaj swoje dane, aby obliczyć potencjalne oszczędności
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

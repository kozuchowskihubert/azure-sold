'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function Contact() {
  const t = useTranslations('contact')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
        
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Wystąpił błąd. Spróbuj ponownie.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Nie udało się wysłać wiadomości. Sprawdź połączenie internetowe.')
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      value: '+48 123 456 789',
      link: 'tel:+48123456789'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'kontakt@azure-solar.pl',
      link: 'mailto:kontakt@azure-solar.pl'
    },
    {
      icon: MapPin,
      title: 'Adres',
      value: 'ul. Słoneczna 1, 00-001 Warszawa',
      link: 'https://maps.google.com'
    }
  ]
  
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-4">
          <Mail className="w-5 h-5 text-green-600" />
          <span className="text-sm font-semibold text-green-600">
            Skontaktuj się z nami
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
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Jan Kowalski"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                />
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="jan@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('phone')} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+48 123 456 789"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('subject')} *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                >
                  <option value="">Wybierz temat</option>
                  <option value="quote">Wycena instalacji</option>
                  <option value="residential">Instalacja domowa</option>
                  <option value="commercial">Instalacja biznesowa</option>
                  <option value="service">Serwis i konserwacja</option>
                  <option value="other">Inne pytanie</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('message')} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Opisz swoje zapytanie..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all resize-none"
                />
              </div>
              
              {/* Success Message */}
              {status === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-900">Wiadomość wysłana!</p>
                    <p className="text-sm text-green-700">Skontaktujemy się z Tobą w ciągu 24 godzin.</p>
                  </div>
                </div>
              )}
              
              {/* Error Message */}
              {status === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-900">Błąd wysyłania</p>
                    <p className="text-sm text-red-700">{errorMessage}</p>
                  </div>
                </div>
              )}
              
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Wysyłanie...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    {t('submit')}
                  </span>
                )}
              </button>
              
              <p className="text-sm text-gray-500 text-center">
                * Pola wymagane. Twoje dane są chronione zgodnie z RODO.
              </p>
            </form>
          </div>
          
          {/* Contact Info & Map */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <a
                    key={index}
                    href={info.link}
                    target={info.title === 'Adres' ? '_blank' : undefined}
                    rel={info.title === 'Adres' ? 'noopener noreferrer' : undefined}
                    className="card p-6 flex items-center gap-4 hover:shadow-lg transition-all group"
                  >
                    <div className="w-14 h-14 bg-gradient-solar rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">{info.title}</div>
                      <div className="font-semibold text-gray-900">{info.value}</div>
                    </div>
                  </a>
                )
              })}
            </div>
            
            {/* Map Placeholder */}
            <div className="card p-0 overflow-hidden h-64">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Mapa - lokalizacja biura</p>
                </div>
              </div>
            </div>
            
            {/* Business Hours */}
            <div className="card p-6 bg-gradient-to-br from-blue-50 to-orange-50">
              <h3 className="font-bold text-lg text-gray-900 mb-4">
                ⏰ Godziny otwarcia
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Poniedziałek - Piątek</span>
                  <span className="font-semibold text-gray-900">8:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Sobota</span>
                  <span className="font-semibold text-gray-900">9:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Niedziela</span>
                  <span className="font-semibold text-gray-900">Zamknięte</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

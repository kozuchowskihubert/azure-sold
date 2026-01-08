# 🌐 Azure Solar - Struktura Witryny

## Schemat kolorystyczny: Niebiesko-zielony gradient

```css
--azure-blue: #0EA5E9
--azure-cyan: #06B6D4
--azure-green: #10B981
--azure-emerald: #059669

gradient: linear-gradient(135deg, #0EA5E9 0%, #10B981 100%)
```

## 📂 Struktura podstron (Multi-page site)

### ✅ GOTOWE:

1. **index.html** - Strona główna
   - Hero z CTA
   - Usługi (overview)
   - Kalkulator
   - Portfolio (preview)
   - Kontakt (formularz)
   
2. **o-nas.html** - O firmie  
   - Misja i wizja
   - Statystyki (500+ instalacji, 15 lat, 98% zadowolenia)
   - Zespół (3 osoby)
   - Certyfikaty (SEP, ISO 9001, ubezpieczenie)

3. **fotowoltaika.html** - Instalacje fotowoltaiczne
   - 3 pakiety (5kW/10kW/15kW)
   - Cennik
   - Korzyści (oszczędności, ekologia, dotacje, zwrot)
   - Proces realizacji (5 kroków)

### 🔨 DO ZROBIENIA:

4. **pompy-ciepla.html** - Pompy ciepła
   - Rodzaje pomp (powietrzne, gruntowe, wodne)
   - Pakiety z cenami
   - Współpraca z fotowoltaiką
   - Dotacje Czyste Powietrze

5. **magazyny-energii.html** - Magazyny energii
   - Baterie litowe
   - Pakiety (5kWh/10kWh/15kWh)
   - Niezależność energetyczna
   - ROI calculations

6. **klimatyzacja.html** - Klimatyzacja
   - Split, Multi-split, VRF
   - Chłodzenie + ogrzewanie
   - Pakiety dla domu i firmy

7. **realizacje.html** - Portfolio projektów
   - Galeria z filtrem (dom/firma/gospodarstwo)
   - Case studies
   - Before/after
   - Opinie klientów

8. **blog.html** - Blog/Aktualności
   - Lista artykułów (grid)
   - Kategorie (Fotowoltaika, Pompy, Dotacje, Poradniki)
   - Pojedynczy post: blog-post.html

9. **dotacje.html** - Informacje o dotacjach
   - Mój Prąd (do 7000 zł)
   - Czyste Powietrze (do 69000 zł)
   - Ulga termomodernizacyjna
   - Pomoc w uzyskaniu

10. **kontakt.html** - Pełna strona kontaktu
    - Formularz
    - Mapa (Google Maps iframe)
    - Dane kontaktowe
    - Godziny otwarcia
    - FAQ

11. **kalkulator.html** - Dedykowana strona kalkulatora
    - Rozbudowany kalkulator
    - Porównanie scenariuszy
    - PDF z wyceną
    - Zapis do bazy

12. **cennik.html** - Pełny cennik
    - Wszystkie usługi
    - Tabele porównawcze
    - Promocje
    - Download PDF

### 🎯 Dodatkowe funkcjonalne:

13. **logowanie.html** - Panel klienta (login)
14. **panel-klienta.html** - Dashboard klienta
    - Moje instalacje
    - Monitoring produkcji
    - Faktury
    - Zgłoszenia serwisowe

15. **panel-admin.html** - Dashboard admina
    - Leady
    - Projekty w realizacji
    - Kalendarz montaży
    - Raporty

## 📱 Nawigacja

### Menu główne (Desktop):
```
Logo | Start | O nas | [Usługi ▼] | Realizacje | Blog | Dotacje | Kontakt | [Kalkulator CTA]
```

### Menu rozwijane "Usługi":
```
- 🔆 Fotowoltaika
- 🌡️ Pompy ciepła
- 🔋 Magazyny energii
- ❄️ Klimatyzacja
```

### Footer:
```
[Logo + opis]  [Usługi]  [Firma]  [Kontakt]  [Social Media]
```

## 🎨 Komponenty wielokrotnego użytku

### Navigation (nav.html - do include)
```html
<nav class="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
  <!-- Logo, Menu, CTA -->
</nav>
```

### Footer (footer.html - do include)
```html
<footer class="bg-gray-900 text-white py-12">
  <!-- 4 kolumny: Logo, Usługi, Firma, Kontakt -->
</footer>
```

### CTA Section (wielokrotne użycie)
```html
<section class="py-20 gradient-azure">
  <h2>Heading</h2>
  <p>Description</p>
  <a href="#">CTA Button</a>
</section>
```

## 🔄 Integracje

### API Backend (Flask):
- POST /api/contact - Formularz kontaktowy
- POST /api/calculator - Obliczenia
- POST /api/quote - Zapytanie ofertowe
- GET /api/projects - Lista realizacji
- GET /api/blog - Artykuły

### External:
- Google Maps API (kontakt.html)
- Google Analytics
- Facebook Pixel (opcjonalnie)
- reCAPTCHA (formularze)

## 📊 Metryki sukcesu

- [ ] Wszystkie 15 podstron
- [ ] Responsywność (mobile/tablet/desktop)
- [ ] Lighthouse Score > 90
- [ ] Load time < 2s
- [ ] SEO optimization
- [ ] Accessibility (WCAG 2.1)

## 🚀 Deployment

### Struktura plików:
```
static/
├── index.html           ✅
├── o-nas.html          ✅
├── fotowoltaika.html   ✅
├── pompy-ciepla.html
├── magazyny-energii.html
├── klimatyzacja.html
├── realizacje.html
├── blog.html
├── blog-post.html
├── dotacje.html
├── kontakt.html
├── kalkulator.html
├── cennik.html
├── logowanie.html
├── panel-klienta.html
├── panel-admin.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── README.md
```

### Vercel deploy:
```bash
cd /Users/haos/azure-sold
vercel --prod static/
```

---

**Status:** 3/15 stron gotowych (20%)  
**Next:** Pompy ciepła, Magazyny energii, Realizacje  
**Priorytet:** Strony usługowe → Portfolio → Blog → Panele

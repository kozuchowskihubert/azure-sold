# 🔍 CEIRG - SEO Strategy & Google Search Console Setup

## 📊 SEO Audit & Optimization Plan

### Current Status:
- ✅ Static HTML website (15 pages)
- ✅ Clean URLs enabled (/o-nas instead of /o-nas.html)
- ✅ Meta tags present on all pages
- ⚠️ Missing: sitemap.xml
- ⚠️ Missing: robots.txt
- ⚠️ Missing: structured data (Schema.org)
- ⚠️ Missing: Google Search Console setup

---

## 🎯 SEO Goals (6 months)

### Traffic:
- Organic traffic: 0 → 5000+ visitors/month
- Keyword rankings: 0 → 50+ keywords in top 10
- Domain authority: 0 → 25+

### Conversions:
- Lead form submissions: 100+/month
- Calculator usage: 500+/month
- Phone calls: 50+/month

---

## 🔑 Keyword Strategy

### Primary Keywords (High Priority):
1. **fotowoltaika warszawa** (590/mo, KD: 35)
2. **instalacja fotowoltaiczna cena** (1900/mo, KD: 42)
3. **pompy ciepła warszawa** (480/mo, KD: 38)
4. **dotacje fotowoltaika 2024** (2400/mo, KD: 45)
5. **panele słoneczne cena** (3600/mo, KD: 48)

### Secondary Keywords:
6. magazyny energii cena (880/mo, KD: 35)
7. kalkulator fotowoltaiki (720/mo, KD: 32)
8. klimatyzacja montaż warszawa (390/mo, KD: 40)
9. mój prąd 7.0 (1600/mo, KD: 38)
10. czyste powietrze dotacja (1200/mo, KD: 36)

### Long-tail Keywords (15+):
- ile kosztuje instalacja fotowoltaiczna 10kw
- pompa ciepła powietrze woda opinie
- jak otrzymać dotację na fotowoltaikę
- magazyn energii do fotowoltaiki
- fotowoltaika z montażem tanio warszawa
... (pełna lista 50+ keywords)

---

## 📄 Technical SEO Fixes

### 1. Create sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://azure-sold.vercel.app/</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://azure-sold.vercel.app/o-nas</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://azure-sold.vercel.app/fotowoltaika</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://azure-sold.vercel.app/pompy-ciepla</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://azure-sold.vercel.app/magazyny-energii</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://azure-sold.vercel.app/klimatyzacja</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://azure-sold.vercel.app/realizacje</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://azure-sold.vercel.app/cennik</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://azure-sold.vercel.app/kontakt</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://azure-sold.vercel.app/blog</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://azure-sold.vercel.app/kalkulator</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://azure-sold.vercel.app/dotacje</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 2. Create robots.txt

```txt
User-agent: *
Allow: /

# Block admin and login pages from indexing
Disallow: /logowanie
Disallow: /panel-klienta
Disallow: /panel-admin

# Sitemap location
Sitemap: https://azure-sold.vercel.app/sitemap.xml

# Crawl-delay for polite bots
Crawl-delay: 1
```

### 3. Add Structured Data (Schema.org)

**LocalBusiness Schema** for homepage:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "CEIRG",
  "description": "Profesjonalne instalacje fotowoltaiczne i rozwiązania OZE",
  "image": "https://azure-sold.vercel.app/images/logo-ceirg.png",
  "logo": "https://azure-sold.vercel.app/images/logo-ceirg.png",
  "url": "https://azure-sold.vercel.app",
  "telephone": "+48123456789",
  "email": "kontakt@ceirg.pl",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ul. Słoneczna 1",
    "addressLocality": "Warszawa",
    "postalCode": "00-001",
    "addressCountry": "PL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "52.2297",
    "longitude": "21.0122"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "14:00"
    }
  ],
  "sameAs": [
    "https://facebook.com/ceirg",
    "https://instagram.com/ceirg",
    "https://linkedin.com/company/ceirg"
  ],
  "priceRange": "$$"
}
```

**Service Schema** for service pages:
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Instalacja fotowoltaiczna",
  "provider": {
    "@type": "Organization",
    "name": "CEIRG"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Warszawa i okolice"
  },
  "offers": {
    "@type": "Offer",
    "priceRange": "22000-52000 PLN",
    "priceCurrency": "PLN"
  }
}
```

**BreadcrumbList** for navigation:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://azure-sold.vercel.app/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Fotowoltaika",
      "item": "https://azure-sold.vercel.app/fotowoltaika"
    }
  ]
}
```

---

## 🔧 Google Search Console Setup

### Step 1: Verification

**Method 1: HTML File Upload**
```bash
# Download verification file from GSC
# Upload to: /Users/haos/azure-sold/static/
# File name: google1234567890abcdef.html
# Content: google-site-verification: google1234567890abcdef.html
```

**Method 2: Meta Tag (Recommended)**
```html
<meta name="google-site-verification" content="YOUR_CODE_HERE" />
```

**Method 3: DNS TXT Record** (when ceirg.pl domain is live)
```
google-site-verification=YOUR_CODE_HERE
```

### Step 2: Submit Sitemap
```
1. Go to: https://search.google.com/search-console
2. Click "Sitemaps" in left menu
3. Enter: https://azure-sold.vercel.app/sitemap.xml
4. Click "Submit"
```

### Step 3: Request Indexing
For each important page:
```
1. URL Inspection tool
2. Enter page URL
3. Click "Request Indexing"
```

Priority pages to index first:
1. Homepage (/)
2. Fotowoltaika
3. Pompy ciepła
4. Dotacje
5. Kalkulator
6. Cennik
7. Realizacje
8. Kontakt

---

## 📊 Google Analytics 4 Setup

### Installation:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Events to Track:

**Conversions:**
```javascript
// Form submission
gtag('event', 'generate_lead', {
  'event_category': 'Contact',
  'event_label': 'Contact Form'
});

// Calculator usage
gtag('event', 'calculator_use', {
  'event_category': 'Engagement',
  'event_label': 'PV Calculator'
});

// Phone click
gtag('event', 'phone_click', {
  'event_category': 'Contact',
  'event_label': '+48 123 456 789'
});
```

**Custom Events:**
- File downloads (brochures, certificates)
- Video plays (realizacje)
- Scroll depth (engagement metric)
- Outbound links clicks

---

## 🎯 On-Page SEO Checklist

### For Each Page:

- [ ] **Title Tag** (50-60 chars)
  - Include primary keyword
  - Include brand name (CEIRG)
  - Example: "Fotowoltaika Warszawa | Instalacje PV | CEIRG"

- [ ] **Meta Description** (150-160 chars)
  - Include CTA
  - Include USP
  - Example: "Profesjonalne instalacje fotowoltaiczne w Warszawie. Dotacje do 69k zł. 15 lat doświadczenia. Bezpłatna wycena! ☎ 123-456-789"

- [ ] **H1 Tag** (1 per page)
  - Include primary keyword
  - Unique for each page

- [ ] **H2-H6 Tags** (hierarchy)
  - Use for content structure
  - Include secondary keywords

- [ ] **Image Alt Tags**
  - Descriptive text for all images
  - Include keywords where natural

- [ ] **Internal Links**
  - 3-5 links to related pages
  - Descriptive anchor text

- [ ] **Content Length**
  - Minimum 300 words per page
  - Service pages: 800-1200 words
  - Blog posts: 1500-2500 words

- [ ] **URL Structure**
  - Clean, descriptive URLs ✅ (already done)
  - No special characters
  - Lowercase only

---

## 📝 Content Marketing Plan

### Blog Content Calendar (12 weeks):

**Week 1-4: Fotowoltaika Series**
1. Jak wybrać moc instalacji fotowoltaicznej? (1500 słów)
2. Fotowoltaika zimą - czy warto? (1200 słów)
3. Mikroinwertery vs inwerter centralny (1800 słów)
4. Ile kosztuje fotowoltaika z montażem? (1400 słów)

**Week 5-8: Pompy Ciepła Series**
5. Pompa ciepła - kompletny przewodnik 2024 (2500 słów)
6. Pompa ciepła vs gaz - co się bardziej opłaca? (1600 słów)
7. Jaką moc pompy ciepła wybrać? (1300 słów)
8. Pompa ciepła zimą - czy działa przy -20°C? (1400 słów)

**Week 9-12: Dotacje & Magazyny**
9. Mój Prąd 7.0 - wszystko co musisz wiedzieć (2000 słów)
10. Czyste Powietrze - jak otrzymać 69k zł? (1800 słów)
11. Magazyny energii - czy warto dodać baterię? (1500 słów)
12. Ulga termomodernizacyjna - jak rozliczyć? (1400 słów)

**SEO Requirements for each post:**
- Primary keyword in title, H1, first paragraph
- LSI keywords throughout content
- 3-5 internal links
- 1-2 external links (authority sites)
- Featured image with alt tag
- Meta description with CTA
- Minimum 3 H2 subheadings
- Table of contents for 1500+ word posts

---

## 🔗 Link Building Strategy

### Month 1-2: Foundation
- Local business directories (50+)
  - Google My Business
  - Yelp Polska
  - Panorama Firm
  - Pkt.pl
  - Katalog Stron

- Industry directories
  - Fotowoltaika.info
  - OZE.pl katalog
  - EnergetykaPro

### Month 3-4: Content Marketing
- Guest posting (5 posts/month)
  - EkoTrend.pl
  - EnergiaOdnawialna.pl
  - Dom.pl blog
  
- Press releases
  - Announce rebranding
  - Major project completions
  - Partnership announcements

### Month 5-6: Partnerships
- Local partnerships
  - Architects
  - Construction companies
  - Real estate agencies

- Supplier links
  - Panel manufacturers
  - Inverter brands
  - Battery suppliers

### Ongoing:
- Social media profiles (domain authority)
- YouTube channel description
- Forum participation (relevant, no spam)
- HARO queries (Help A Reporter Out)

---

## 📱 Local SEO Optimization

### Google My Business Optimization:

**Profile Setup:**
```
Business Name: CEIRG
Category: Solar Energy Company
Secondary: HVAC Contractor, Energy Supplier
Description: (750 chars max - keyword rich)
Services: List all 15 services with descriptions
Attributes: 
  - Wheelchair accessible
  - Free estimates
  - Warranty included
  - Licensed professionals
Photos: Minimum 50 photos (projects, team, office)
Posts: Weekly updates
Q&A: Pre-populate 20 common questions
```

**Citations (NAP Consistency):**
Ensure identical information across all platforms:
- Name: CEIRG
- Address: ul. Słoneczna 1, 00-001 Warszawa
- Phone: +48 123 456 789

**Reviews Strategy:**
- Request reviews from satisfied clients
- Respond to all reviews (positive & negative)
- Target: 50+ reviews in 6 months
- Maintain 4.5+ star rating

---

## 🎯 Competitor Analysis

### Top 5 Competitors:
1. SolarCompany.pl
2. EkoEnergia Warszawa
3. GreenPower PV
4. PolskaSolar
5. SunTech Installations

**Analysis Points:**
- Keywords they rank for
- Backlink profile
- Content strategy
- Social media presence
- USPs and pricing

**Competitive Advantages:**
- ✅ Clean, modern website
- ✅ Tile-based navigation (better UX)
- ✅ Interactive calculator
- ✅ Comprehensive dotacje section
- ✅ Chart.js dashboards (unique)

---

## 📊 Monitoring & Reporting

### Weekly Metrics:
- Google Search Console impressions
- Click-through rate (CTR)
- Average position
- Index coverage issues

### Monthly Reports:
- Organic traffic growth
- Keyword rankings (top 50)
- Backlink profile growth
- Conversion rate
- Top landing pages
- Bounce rate & time on site

### Tools:
- **Google Search Console** - Performance data
- **Google Analytics 4** - User behavior
- **Ahrefs/SEMrush** - Keyword tracking & backlinks
- **Google PageSpeed Insights** - Performance
- **Screaming Frog** - Technical SEO audit

---

## ✅ Implementation Checklist

### Immediate (Week 1):
- [ ] Create sitemap.xml
- [ ] Create robots.txt
- [ ] Setup Google Search Console
- [ ] Verify website ownership
- [ ] Submit sitemap to GSC
- [ ] Setup Google Analytics 4
- [ ] Add structured data to homepage
- [ ] Request indexing for top pages

### Short-term (Month 1):
- [ ] Add structured data to all pages
- [ ] Optimize all title tags
- [ ] Optimize all meta descriptions
- [ ] Add image alt tags
- [ ] Create Google My Business profile
- [ ] Submit to 20 directories
- [ ] Write first 4 blog posts
- [ ] Setup Google Tag Manager

### Medium-term (Month 2-3):
- [ ] Continue blog content (2 posts/week)
- [ ] Build 50+ backlinks
- [ ] Guest posting campaign (5 posts)
- [ ] Press release distribution
- [ ] Local citations (50+ sites)
- [ ] Review generation campaign
- [ ] Social signals boost

### Long-term (Month 4-6):
- [ ] Advanced content (pillar pages)
- [ ] Video SEO (YouTube optimization)
- [ ] International SEO (English version)
- [ ] Advanced link building
- [ ] Authority building
- [ ] Brand monitoring & reputation

---

## 💰 Budget Estimate

### Tools (Monthly):
- Ahrefs or SEMrush: 400 zł
- Google Workspace: 30 zł
- Rank tracking: 100 zł
**Subtotal: 530 zł/month**

### Content (Monthly):
- Blog posts (8 × 200 zł): 1600 zł
- Content optimization: 500 zł
**Subtotal: 2100 zł/month**

### Link Building (Monthly):
- Guest posts: 800 zł
- Directory submissions: 200 zł
- PR/Outreach: 500 zł
**Subtotal: 1500 zł/month**

### **Total SEO Budget: 4130 zł/month**

---

## 🚀 Expected Results (6 Months)

### Traffic:
- Month 1: 200 organic visitors
- Month 2: 500 organic visitors
- Month 3: 1000 organic visitors
- Month 4: 2000 organic visitors
- Month 5: 3500 organic visitors
- Month 6: 5000+ organic visitors

### Rankings:
- Month 3: 20+ keywords in top 50
- Month 6: 50+ keywords in top 50
- Month 6: 10+ keywords in top 10

### Conversions:
- Month 6: 100+ leads/month
- Month 6: 50+ phone calls/month
- Month 6: 10+ project contracts/month

---

**Status:** ✅ Ready to implement  
**Priority:** HIGH  
**Timeline:** Start immediately

# 🎨 REBRANDING: Azure Solar → CEIRG

## 📋 Zmiany (8 stycznia 2026, 04:25)

### 🏢 Nowa Marka: **CEIRG**

Logo firmy zawiera:
- **Latarnię morską** (lighthouse) jako symbol "I" w CEIRG
- **Kolor dominujący**: Zielony (#10B981, #059669)
- **Kolor tekstu**: Granatowy ciemny (#1E293B)
- **Symbolika**: Latarnia = przewodnik, światło, energia, niezawodność

---

## 🔄 Co zostało zmienione:

### 1. **Brand Name**
- ❌ Azure Solar
- ✅ **CEIRG**

### 2. **Logo Implementation**
**SVG Lighthouse Icon** (wbudowany):
```svg
<svg viewBox="0 0 40 40">
    <!-- Wieża latarni (prostokąt z zaokrąglonymi rogami) -->
    <rect x="17" y="8" width="6" height="24" fill="#10B981" rx="1"/>
    
    <!-- Światło na szczycie (koło) -->
    <circle cx="20" cy="6" r="3" fill="#10B981"/>
    
    <!-- Podstawa (trapez) -->
    <path d="M 15 30 L 25 30 L 23 35 L 17 35 Z" fill="#059669"/>
    
    <!-- Pasy poziome (4 linie) -->
    <line x1="16" y1="14" x2="24" y2="14" stroke="white" stroke-width="1"/>
    <line x1="16" y1="18" x2="24" y2="18" stroke="white" stroke-width="1"/>
    <line x1="16" y1="22" x2="24" y2="22" stroke="white" stroke-width="1"/>
    <line x1="16" y1="26" x2="24" y2="26" stroke="white" stroke-width="1"/>
</svg>
```

### 3. **Color Scheme**
**Nie zmienione** (pozostają kolory Azure):
- Gradienty: niebieski-zielony (#0EA5E9 → #10B981)
- Kafelki: Zachowane kolorystyka

**Zmienione:**
- Logo background: gradient-azure → **white + green border**
- Brand color emphasis: niebieski → **zielony** (lighthouse)

### 4. **Updated Files**

#### index.html:
- **Meta title**: "Azure Solar" → "CEIRG"
- **Meta description**: zaktualizowany z CEIRG
- **Meta keywords**: dodano "CEIRG"
- **Header logo**: Font Awesome icon → SVG lighthouse
- **Footer logo**: Font Awesome icon → SVG lighthouse
- **Email**: kontakt@azure-solar.pl → kontakt@ceirg.pl
- **Copyright**: "Azure Solar" → "CEIRG"

---

## 🎨 Design Rationale

### Dlaczego latarnia morska?

1. **Przewodnik** - Jak latarnia prowadzi statki, CEIRG prowadzi klientów w świecie OZE
2. **Światło** - Energia, fotowoltaika, jasność, przyszłość
3. **Niezawodność** - Latarnia to symbol bezpieczeństwa i stabilności
4. **Ekologia** - Zielony kolor podkreśla ekologiczny charakter firmy
5. **Innowacja** - Nowoczesna latarnia = nowoczesne technologie energetyczne

### Visual Identity:

```
Logo Layout:
┌────────────────────┐
│  [LIGHTHOUSE]      │
│   CE I RG          │  <- "I" to latarnia
│    ↑               │
│    │               │
│  Latarnia          │
│  (zielona)         │
└────────────────────┘
```

---

## 📊 Brand Comparison

| Element | Azure Solar | CEIRG |
|---------|-------------|-------|
| **Industry Focus** | Solar/PV | OZE (szerszy zakres) |
| **Logo Type** | Icon (solar panel) | Lettermark + Icon |
| **Primary Color** | Azure Blue (#0EA5E9) | Emerald Green (#10B981) |
| **Symbol** | Panel słoneczny | Latarnia morska |
| **Vibe** | Tech-forward | Trustworthy, guiding |
| **Domain** | azure-solar.pl | ceirg.pl |

---

## 🌐 Updated URLs & Contact

### Domain (to update):
- Old: azure-solar.pl
- New: **ceirg.pl** (trzeba zarejestrować)

### Email:
- Old: kontakt@azure-solar.pl
- New: **kontakt@ceirg.pl**

### Social Media (to create):
- Facebook: /ceirg
- Instagram: @ceirg
- LinkedIn: /company/ceirg

---

## 📝 TODO: Remaining Files

Pozostałe 14 plików HTML do aktualizacji:

### Priorytet 1 (High Traffic):
- [ ] **o-nas.html** - About page (nazwa firmy, misja)
- [ ] **kontakt.html** - Contact form (email, dane kontaktowe)
- [ ] **fotowoltaika.html** - Header/footer
- [ ] **pompy-ciepla.html** - Header/footer
- [ ] **magazyny-energii.html** - Header/footer
- [ ] **klimatyzacja.html** - Header/footer

### Priorytet 2 (Medium Traffic):
- [ ] **realizacje.html** - Portfolio (logo w projektach)
- [ ] **cennik.html** - Pricing (nazwa firmy)
- [ ] **blog.html** - Blog header/footer
- [ ] **kalkulator.html** - Calculator header/footer
- [ ] **dotacje.html** - Subsidy info header/footer

### Priorytet 3 (Low Traffic):
- [ ] **logowanie.html** - Login page
- [ ] **panel-klienta.html** - Client dashboard
- [ ] **panel-admin.html** - Admin dashboard

---

## 🔧 Batch Update Script

Stworzyć skrypt do masowej zamiany:

```bash
#!/bin/bash
# rebranding.sh

FILES=(
    "o-nas.html"
    "fotowoltaika.html"
    "pompy-ciepla.html"
    "magazyny-energii.html"
    "klimatyzacja.html"
    "realizacje.html"
    "cennik.html"
    "kontakt.html"
    "blog.html"
    "kalkulator.html"
    "dotacje.html"
    "logowanie.html"
    "panel-klienta.html"
    "panel-admin.html"
)

cd /Users/haos/azure-sold/static

for file in "${FILES[@]}"; do
    echo "Processing $file..."
    
    # Replace brand name
    sed -i '' 's/Azure Solar/CEIRG/g' "$file"
    
    # Replace email
    sed -i '' 's/azure-solar\.pl/ceirg.pl/g' "$file"
    
    # Replace meta keywords
    sed -i '' 's/keywords" content="/keywords" content="CEIRG, /g' "$file"
    
    echo "✓ $file updated"
done

echo "✅ All files updated!"
```

---

## 🎯 Next Steps

### Immediate:
1. ✅ Update index.html (DONE)
2. ⏳ Create rebranding script
3. ⏳ Update all 14 remaining HTML files
4. ⏳ Test all pages
5. ⏳ Deploy to production

### Short-term:
1. Register domain: **ceirg.pl**
2. Setup email: **kontakt@ceirg.pl**
3. Create social media accounts
4. Update Google Business Profile
5. Update marketing materials

### Long-term:
1. SEO migration (301 redirects)
2. Update business cards
3. Update vehicle branding
4. Update uniforms/merch
5. Press release about rebranding

---

## 📸 Logo Specs

### Original Logo (from screenshot):
- Width: ~600px
- Height: ~400px
- Format: PNG with transparency
- Elements: "CEIRG" text + lighthouse + lightning bolts

### SVG Implementation:
- Viewport: 40x40
- Colors: #10B981 (main), #059669 (darker), white (stripes)
- Scalable: Yes (vector)
- File size: ~500 bytes (inline SVG)

### Usage Guidelines:
- **Minimum size**: 32x32px (legible)
- **Maximum size**: Unlimited (vector)
- **Clear space**: 10px around logo
- **Background**: White or light gray preferred
- **Border**: Optional 2px green (#10B981)

---

## ✅ Deployment Status

**Current Status:** 
- ✅ index.html updated
- ⏳ 14 files pending
- ⏳ Not deployed yet

**Command to deploy:**
```bash
cd /Users/haos/azure-sold
git add static/
git commit -m "Rebranding: Azure Solar → CEIRG"
git push
```

---

**Last Updated:** January 8, 2026, 04:25 AM  
**Status:** 🔄 In Progress (7% complete - 1/15 files)

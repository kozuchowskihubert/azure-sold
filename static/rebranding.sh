#!/bin/bash
# Rebranding script: Azure Solar → CEIRG
# Created: January 8, 2026

echo "🎨 CEIRG Rebranding Script"
echo "=========================="
echo ""

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

cd /Users/haos/azure-sold/static || exit

UPDATED=0
FAILED=0

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "📝 Processing: $file"
        
        # Replace brand name
        sed -i '' 's/Azure Solar/CEIRG/g' "$file"
        
        # Replace email domain
        sed -i '' 's/azure-solar\.pl/ceirg.pl/g' "$file"
        
        # Replace email prefix (if any)
        sed -i '' 's/kontakt@azure-solar/kontakt@ceirg/g' "$file"
        sed -i '' 's/solar@/ceirg@/g' "$file"
        
        # Add CEIRG to meta keywords if not present
        if grep -q "keywords" "$file"; then
            sed -i '' 's/keywords" content="/keywords" content="CEIRG, /g' "$file"
        fi
        
        echo "   ✅ $file updated"
        ((UPDATED++))
    else
        echo "   ❌ $file not found"
        ((FAILED++))
    fi
done

echo ""
echo "=========================="
echo "✅ Updated: $UPDATED files"
echo "❌ Failed: $FAILED files"
echo "=========================="
echo ""
echo "Next steps:"
echo "1. Review changes: git diff"
echo "2. Test locally: python3 -m http.server 8000"
echo "3. Commit: git add . && git commit -m 'Rebranding: Azure Solar → CEIRG'"
echo "4. Deploy: git push"

#!/bin/bash

# Script to update all HTML files with premium styles

HTML_FILES=(
    "fotowoltaika.html"
    "pompy-ciepla.html"
    "magazyny-energii.html"
    "klimatyzacja.html"
    "kalkulator.html"
    "dotacje.html"
    "cennik.html"
    "realizacje.html"
    "o-nas.html"
    "blog.html"
    "kontakt.html"
    "logowanie.html"
    "panel-klienta.html"
)

FONT_LINK='    <!-- Modern Fonts (haos.fm inspired) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">'

STYLE_LINK='    <link rel="stylesheet" href="premium-styles.css">'

BODY_STYLE='<body class="min-h-screen" style="background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 30%, #dbeafe 60%, #d1fae5 100%);">'

echo "🚀 Updating HTML files with premium styles..."

for file in "${HTML_FILES[@]}"; do
    if [ -f "static/$file" ]; then
        echo "📝 Processing: $file"
        
        # Backup original
        cp "static/$file" "static/${file}.backup"
        
        # Add premium-styles.css link after font-awesome if not exists
        if ! grep -q "premium-styles.css" "static/$file"; then
            sed -i '' 's|</head>|    <link rel="stylesheet" href="premium-styles.css">\n</head>|' "static/$file"
        fi
        
        # Update body tag if has bg-gray
        sed -i '' 's|<body class="bg-gray-[0-9]*">|<body class="min-h-screen" style="background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 30%, #dbeafe 60%, #d1fae5 100%);">|g' "static/$file"
        
        echo "✅ Updated: $file"
    else
        echo "⚠️  File not found: $file"
    fi
done

echo ""
echo "🎉 All files updated!"
echo "📦 Backups created with .backup extension"
echo "🔥 Premium styles applied!"

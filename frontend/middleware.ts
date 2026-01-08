import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Lista obsługiwanych języków
  locales: ['pl', 'en'],

  // Domyślny język
  defaultLocale: 'pl',
  
  // Ustawienia ścieżek
  localePrefix: 'as-needed'
});

export const config = {
  // Dopasuj tylko ścieżki z internacjonalizacją
  matcher: ['/', '/(pl|en)/:path*']
};

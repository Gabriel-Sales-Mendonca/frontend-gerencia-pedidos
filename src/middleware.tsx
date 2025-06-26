import { NextResponse, NextRequest, MiddlewareConfig } from 'next/server';

const publicRoutes = [
  { path: '/login', whenAuthenticated: 'redirect' }
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/login';

// 🔓 Rotas públicas adicionais (arquivos estáticos)
const alwaysPublicPaths = [
  '/manifest.json',
  '/manifest.webmanifest',
  '/favicon.ico',
  '/icons', // toda a pasta de ícones
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Permitir tudo que estiver nas rotas públicas fixas
  if (alwaysPublicPaths.some((publicPath) => path.startsWith(publicPath))) {
    return NextResponse.next();
  }

  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get('token')?.value;

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectURL = request.nextUrl.clone();
    redirectURL.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectURL);
  }

  if (authToken && publicRoute?.whenAuthenticated === 'redirect') {
    const redirectURL = request.nextUrl.clone();
    redirectURL.pathname = '/';
    return NextResponse.redirect(redirectURL);
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

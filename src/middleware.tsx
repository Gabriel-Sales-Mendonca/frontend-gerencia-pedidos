import { NextResponse, NextRequest, MiddlewareConfig } from 'next/server';

const publicRoutes = [
    { path: '/login', whenAuthenticated: 'redirect' }
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/login'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const publicRoute = publicRoutes.find((route) => route.path == path)

    const authToken = request.cookies.get('token')?.value;

    if (!authToken && publicRoute) {
        return NextResponse.next()
    }

    if (!authToken && !publicRoute) {
        const redirectURL = request.nextUrl.clone()

        redirectURL.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

        return NextResponse.redirect(redirectURL)
    }

    if (authToken && publicRoute?.whenAuthenticated == 'redirect') {
        const redirectURL = request.nextUrl.clone()

        redirectURL.pathname = '/'

        return NextResponse.redirect(redirectURL)
    }

    if (authToken && !publicRoute) {
        // TO_DO: verificar se o token está vencido

        return NextResponse.next()
    }

    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: [
        /*
            * Match all request paths except for the ones starting with:
            * - api (API routes)
            * - _next/static (static files)
            * - _next/image (image optimization files)
            * - favicon.ico, sitemap.xml, robots.txt (metadata files)
            */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ]
}
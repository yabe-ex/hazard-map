import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const { data: { user }, error } = await supabase.auth.getUser()

    // Debug logging
    console.log(`[Middleware] Path: ${request.nextUrl.pathname}, User: ${user?.id || 'None'}`);

    // CMS Route Protection
    if (request.nextUrl.pathname.startsWith('/dashboard/cms')) {
        if (!user) {
            console.log('[Middleware] CMS Access denied: No user');
            return NextResponse.redirect(new URL('/', request.url));
        }

        // Check Role
        const { data: roleData, error: roleError } = await supabase
            .from('admin_roles')
            .select('role')
            .eq('user_id', user.id)
            .single();

        console.log(`[Middleware] User Role: ${roleData?.role}`);

        if (roleError || !roleData || roleData.role !== 'super_admin') {
            console.log('[Middleware] CMS Access denied: Not super_admin');
            return NextResponse.redirect(new URL('/dashboard', request.url)); // Redirect to dashboard or home
        }
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images (public images)
         */
        '/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}

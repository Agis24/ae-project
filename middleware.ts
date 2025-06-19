// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// const CODE = process.env.PASSCODE

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl

//   // Allow access to code entry page, API routes, and static files
//   if (
//     pathname === 'pages/enter-code' ||
//     pathname.startsWith('/api/') ||
//     pathname.match(/^\/_next\//)
//   ) {
//     return NextResponse.next()
//   }

//   // If cookie not set or wrong, redirect to /enter-code
//   const pass = req.cookies.get('passcode')?.value
//   if (pass !== CODE) {
//     const url = req.nextUrl.clone()
//     url.pathname = '/pages/enter-code'
//     return NextResponse.redirect(url)
//   }

//   return NextResponse.next()
// }

// export const config = { matcher: '/:path*' }
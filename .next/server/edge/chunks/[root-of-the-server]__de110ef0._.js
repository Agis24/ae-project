(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__de110ef0._.js", {

"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[project]/middleware.ts [middleware-edge] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
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
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__de110ef0._.js.map
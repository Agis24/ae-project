// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'
// import MenuRow from '@/components/menurow'
// import { useRouter } from 'next/router'

// export default function MyApp({ Component, pageProps }: AppProps) {
//   const router = useRouter()
//   const hideMenuOn = ['/enter-code', '/rsvp', '/rsvp-plusone', '/thank-you', '/thank-you-plusone']

//   return (
//     <>
//       {!hideMenuOn.includes(router.pathname) && <MenuRow />}
//       <div className="pt-16">
//         <Component {...pageProps} />
//       </div>
//     </>
//   )
// }


import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter, Playfair_Display } from 'next/font/google'
import 'react-phone-number-input/style.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} ${playfair.variable} font-sans bg-white text-ink`}>
      <Component {...pageProps} />
    </div>
  )
}
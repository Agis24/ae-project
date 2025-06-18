import '@/styles/globals.css'
import MenuRow from '@/components/menurow'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MenuRow />
      <div className="pt-16">
        <Component {...pageProps} />
      </div>
    </>
  )
}
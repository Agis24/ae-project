import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import MenuRow from '@/components/menurow'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const hideMenuOn = ['/enter-code']

  return (
    <>
      {!hideMenuOn.includes(router.pathname) && <MenuRow />}
      <div className="pt-16">
        <Component {...pageProps} />
      </div>
    </>
  )
}

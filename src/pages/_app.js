import Layout from '@/components/Layout'
import { AuthProvider } from '@/context/AuthContext'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import NProgress from 'nprogress';
import "nprogress/nprogress.css";
import { useEffect } from 'react';
import Head from 'next/head';


export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    NProgress.configure({
      minimum: 0.3,
      easing: 'ease',
      speed: 500,
      showSpinner: false,
    });

    const handleStart = (url) => {
      NProgress.start()
    }

    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <AuthProvider>
    <Head>
    <title>ROMU</title>
    <link rel="icon" href="/favicon.ico"/>
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </AuthProvider>
  )
}

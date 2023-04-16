import '@/styles/globals.css'
import Head from 'next/head'

export const metadata = {
  title: 'Write quotes from your best song',
  description: 'Get inspired by the song you listen to',
}

export default function RootLayout({ Component, pageProps }) {
  
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="title" content={metadata.title} />
        <meta name="description" content={metadata.description} />
        {/* <link rel = "icon" href= "/logo.svg" 
        type = "image/x-icon"></link> */}
      </Head>
      <Component {...pageProps} />
    </>
  )
}

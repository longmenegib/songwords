import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import HeroHome from '@/components/HeroHome'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="h-full bg-black">
      {/* <Header /> */}
      <main className="flex-grow w-full bg-black text-white">
        <div className='flex justify-center'>
        <a href="https://www.producthunt.com/posts/song-words?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-song&#0045;words" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=389691&theme=light" alt="Song&#0032;Words - Become&#0032;a&#0032;quote&#0032;creator&#0032;in&#0032;less&#0032;than&#0032;15&#0032;seconds&#0032;for&#0032;free | Product Hunt"  width={250} height={54} /></a>
        </div>
        <HeroHome />
      </main>
      <Footer />
    </div>
  )
}

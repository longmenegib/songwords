import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import HeroHome from '@/components/HeroHome'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <main className="flex-grow w-full bg-black text-white">
        <HeroHome />
      </main>
      <Footer />
    </>
  )
}

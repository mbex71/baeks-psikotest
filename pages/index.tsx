import type { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { useSession } from 'next-auth/react'


const Home: NextPage = () => {

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-white'>
      <h1 className='text-4xl font-semibold tracking-wider'>Selamat Datang</h1>
      <Link href="/auth/signin">
        <a className='p-4 bg-emerald-400 w-1/6 text-center mt-6 text-white hover:bg-emerald-500 text-sm'>Masuk</a>
      </Link>
    </div>
  )
}



export default Home

import type { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {

      router.push('/auth/signin')
    }, 1500);
  }, [router])

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-white'>
      <h1 className='text-4xl font-semibold tracking-wider'>Selamat Datang</h1>
    </div>
  )
}



export default Home

import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Head from 'next/head'
import PostBox from '@/components/PostBox'
import Feed from '@/components/Feed'


export default function Home() {
  return (
    <main className='my-7 mx-auto max-w-5xl'>
      <Head>
        <title>Reddit 2.0</title>
      </Head>

      {/* PostBox */}
      <PostBox />

      <Feed />
      {/* Feed */}
      <div className='flex'>
       
      </div>
    </main>
  )
}

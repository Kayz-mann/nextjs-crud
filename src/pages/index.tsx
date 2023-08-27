import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Head from 'next/head'
import PostBox from '@/components/PostBox'
import Feed from '@/components/Feed'
import { useQuery } from '@apollo/client'
import { GET_SUBREDDITS_WITH_LIMIT } from '@/graphql/queries'
import SubredditRow from '@/components/SubredditRow'


export default function Home() {
  const { data, error } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
    variables: {
      limit: 10
    }
  });

  const subreddit: Subreddit[] = data?.subredditListLimit

  console.log('community', subreddit)
  console.error('community', error)

  return (
    <main className='my-7 mx-auto max-w-5xl'>
      <Head>
        <title>Reddit 2.0</title>
      </Head>

      {/* PostBox */}
      <PostBox />


      {/* Feed */}
      <div className='flex'>
        <Feed />

        <div className='sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px]
        rounded-md border border-gray-300 bg-white lg:inline'>
          <p className='text-md mb-1 p-4 pb-3 font-bold '>Top Communities</p>

          <div className='p-4'>
            {/* list subreddits */}
            {subreddit?.map((subreddit, i) => (
              <SubredditRow
                index={String(i)}
                key={subreddit.id}
                topic={subreddit.topic}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

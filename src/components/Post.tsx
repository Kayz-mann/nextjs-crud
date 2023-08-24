import { ArrowDownIcon, ArrowUpIcon, BookmarkIcon, ChatBubbleBottomCenterIcon, ChatBubbleLeftEllipsisIcon, EllipsisHorizontalIcon, GiftIcon, ShareIcon } from '@heroicons/react/24/outline'
import React from 'react'
import Avatar from './Avatar'
import TimeAgo from 'react-timeago'
import Image from 'next/image'

type Props = {
    post: Post
}
const Post = ({ post }: Props) => {
    const subredditTopic = post?.subreddit?.[0]?.topic ?? "Unknown Subreddit";

    return (
        <div className='rounded-md flex cursor-pointer border border-gray-300
        bg-white shadow-sm hover:border hover:border-gray-600'>
            <div
                className='flex flex-col items-center justify-start space-y-1
            rounded-l-md bg-gray-50 text-gray-400'
            >
                <ArrowUpIcon className='voteButtons hover:text-red-400' />
                <p className='text-xs font-bold text-black'>0</p>
                <ArrowDownIcon className='voteButtons hover:text-red-400' />
            </div>

            <div className='p-3 pb-1'>
                <div className='flex items-center space-x-2'>
                    <Avatar seed={subredditTopic} />
                    <p className='text-xs text-gray-400'>
                        <span
                            className='font-bold text-black hover:text-blue-400 hover:underline'
                        >r/{subredditTopic}</span> * Posted by u/
                        {post.username} <TimeAgo date={post.created_at} />
                    </p>
                </div>

                <div className='py-4'>
                    <h2 className='text-xl font-semibold'>
                        {post.title}
                    </h2>
                    <p className='mt-2 text-sm font-light'>
                        {post.body}
                    </p>
                </div>

                <Image
                    height={100}
                    width={400}
                    className='w-full'
                    src={post?.image || 'https://pbs.twimg.com/media/F4TjDdUXoAA3OMD?format=webp&name=medium'} // Provide a default image URL
                    alt=''
                />

                <div className='flex space-x-4 text-gray-400'>
                    <div className='postButtons'>
                        <ChatBubbleLeftEllipsisIcon className='h-6 w-6' />
                        <p>{post.comment.length} Comments</p>
                    </div>
                    <div className='postButtons'>
                        <GiftIcon className='h-6 w-6' />
                        <p className='hidden sm:inline'>Award</p>
                    </div>
                    <div className='postButtons'>
                        <ShareIcon className='h-6 w-6' />
                        <p className='hidden sm:inline'>Share</p>
                    </div>
                    <div className='postButtons'>
                        <BookmarkIcon className='h-6 w-6' />
                        <p className='hidden sm:inline'>Save</p>
                    </div>
                    <div className='postButtons'>
                        <EllipsisHorizontalIcon className='h-6 w-6' />
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Post
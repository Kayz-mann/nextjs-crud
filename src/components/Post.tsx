import { ArrowDownIcon, ArrowUpIcon, BookmarkIcon, ChatBubbleBottomCenterIcon, ChatBubbleLeftEllipsisIcon, EllipsisHorizontalIcon, GiftIcon, ShareIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import TimeAgo from 'react-timeago'
import Image from 'next/image'
import Link from 'next/link'
import { Jelly } from '@uiball/loaders'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_VOTES_BY_POST_ID } from '@/graphql/queries'
import { ADD_VOTE } from '@/graphql/mutation'

type Props = {
    post: Post
}
const Post = ({ post }: Props) => {
    const [vote, setVote] = useState<boolean | undefined>()
    const { data: session } = useSession()
    const subredditTopic = post?.subreddit?.[0]?.topic ?? "Unknown Subreddit";

    const { data, loading, error } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
        variables: {
            id: post?.id,
            post_id: post?.id
        }
    })

    const [addVote] = useMutation(ADD_VOTE, {
        refetchQueries: [GET_ALL_VOTES_BY_POST_ID, 'votesByPostId'],

        onError: (voteError) => {
            console.error('vote error', voteError)
        }
    })

    const upVote = async (isUpVote: boolean) => {
        if (!session) {
            toast("You'll need to sign in to Vote! ")
            return
        }

        // if (vote && !isUpVote) return
        // if (vote === false && isUpVote) return

        console.log('voting...', isUpVote)

        await addVote({
            variables: {
                id: post.id,
                post_id: post.id,
                username: session.user?.name,
                upvote: isUpVote,
                created_at: new Date().toISOString()
            }
        })

        console.log(error)
    }

    useEffect(() => {
        const votes: Vote[] = data?.votesByPostId;
        const userVote = votes?.find(
            (vote) => vote.username === session?.user?.name
        );

        setVote(userVote?.upvote);
    }, [data, session]);


    const displayVotes = (votes: Vote[] | undefined) => {
        if (!votes || votes.length === 0) {
            return 0;
        }

        const displayNumber = votes.reduce(
            (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
            0
        );

        return displayNumber;
    };




    if (!post) return (
        <div className='flex w-full items-center justify-center p-18 text-xl'>
            <Jelly size={50} color='#FF4501' />
        </div>
    )
    return (
        <Link href={`/post/${post.id}`}>
            <div className='rounded-md flex cursor-pointer border border-gray-300
        bg-white shadow-sm hover:border hover:border-gray-600 mb-5'>
                <div
                    className='flex flex-col items-center justify-start space-y-1
                    rounded-l-md bg-gray-50 text-gray-400'
                >
                    <ArrowUpIcon
                        onClick={() => upVote(true)}
                        className={`voteButtons hover:text-red-400 ${vote && 'text-red-400'}`}
                    />
                    <p className='text-xs font-bold text-black'>
                        {displayVotes(data?.votesByPostId)}
                    </p>
                    <ArrowDownIcon
                        onClick={() => upVote(false)}
                        className={`voteButtons hover:text-blue-400 ${vote === false && 'text-blue-400'}`}
                    />
                </div>

                <div className='p-3 pb-1'>
                    <div className='flex items-center space-x-2'>
                        <Avatar seed={subredditTopic} />
                        <p className='text-xs text-gray-400'>
                            <Link href={`/subreddit/${subredditTopic}`}>
                                <span
                                    className='font-bold text-black hover:text-blue-400 hover:underline'
                                >r/{subredditTopic}
                                </span>
                            </Link>
                            * Posted by u/
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

                    <img
                        className='w-full'
                        src={post?.image} 
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
        </Link >
    )
}

export default Post
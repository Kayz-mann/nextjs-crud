import { GET_POST_BY_POST_ID } from '@/graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'

import Post from '../../components/Post'
import { useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ADD_COMMENT } from '@/graphql/mutation'
import { toast } from 'react-hot-toast'
import Avatar from '@/components/Avatar'
import TimeAgo from 'react-timeago'

type FormData = {
    comment: string
}
const PostPage = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const [addComment] = useMutation(ADD_COMMENT, {
        refetchQueries: [GET_POST_BY_POST_ID, 'postListByPostId']
    })
    const { data, error } = useQuery(GET_POST_BY_POST_ID, {
        variables: {
            post_id: router.query.postId
        }
    })
    const post: Post = data?.postListByPostId;


    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormData>()

    const onsubmit: SubmitHandler<FormData> = async (data) => {
        const notification = toast.loading('Posting your comment')

        try {
            await addComment({
                variables: {
                    post: router.query.postId,
                    username: session?.user?.name,
                    text: data.comment,
                    created_at: new Date().toISOString()
                }
            })

            setValue('comment', '')
            console.log(data)

            toast.success('Comment Successfully Posted!', {
                id: notification
            })

        } catch (error) {
            console.error(error)
        }

    }

    return (
        <div className='mx-auto my-7 max-w-5xl'>
            <Post post={post} />

            <div className='rounded-bmd border border-t-0 border-gray-300
            bg-white p-5 pl-16'>
                <p className='text-sm'>Comment as <span className='text-red-500'>{session?.user?.name}</span>
                </p>

                <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col space-y-2 max-w-5xl'>
                    <textarea
                        disabled={!session}
                        className='h-24 rounded-md border border-gray-700 p-2 pl-4
                        maxLength-none disabled:bg-gray-50'
                        placeholder={
                            session ? 'What are your thoughts' : 'Please sign in to comment'
                        }
                        {...register('comment')} // Add this line to bind the textarea value with the form state
                    />

                    <button type='submit'
                        className='rounded-full  bg-red-500 p-3 font-semibold text-white
                    disabled:bggray-200'>
                        Comment
                    </button>
                </form>
            </div>

            <div className='-my-5 rounded-b-md border border-gray-300
            bg-white py-5 px-10'>
                <hr className='py-2' />
                {post?.comment.map((comment: any) => (
                    <div
                        className='relative flex items-center space-x-2 space-y-5'
                        key={comment.id}>
                        <hr className='absolute top-10 h-16 border left-7 z-0 ' />
                        <div className='z-50'>
                            <Avatar seed={comment.username} />
                        </div>

                        <div className='flex flex-col'>
                            <p className='py-2 text-xs text-gray-400'>
                                <span className='font-semibold text-gray-600'>
                                    {comment.username}
                                </span>
                                .<TimeAgo date={comment.created_at} />
                            </p>
                            <p>{comment.text}</p>
                        </div>
                    </div>
                ))}


            </div>
        </div>
    )
}

export default PostPage
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Avatar from './Avatar';
import { LinkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ADD_POST, ADD_SUBREDDIT } from '@/graphql/mutation';
import client from '../../apollo-client';
import { GET_SUBREDDIT_BY_TOPIC } from '@/graphql/queries';
import toast from 'react-hot-toast';
import { log } from 'console';

type FormData = {
    postTitle: string
    postBody: string
    postImage: string
    subreddit: string
}

const PostBox = React.memo(() => {
    const { data: session } = useSession();
    const [addPost] = useMutation(ADD_POST)
    const [addSubreddit] = useMutation(ADD_SUBREDDIT)
    const [imageBoxOpen, setImageBoxOpen] = useState(false)



    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = handleSubmit(async (formData) => {
        const notification = toast.loading('Creating new post')
        try {
            //Query for subreddit topic
            const { data: { subredditListByTopic } } = await client.query({
                query: GET_SUBREDDIT_BY_TOPIC,
                variables: {
                    topic: formData.subreddit
                }
            })

            const subredditExists = subredditListByTopic.length > 0;

            if (!subredditExists) {
                //create subreddit
                console.log('new subreddit creating...')
                const { data: { insertSubreddit: newSubreddit } } = await addSubreddit({
                    variables: {
                        topic: formData.subreddit
                    }
                })

                console.log('Creating post', formData);

                const image = formData.postImage || ''

                const { data: { insertPost: newPost } } = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        subreddit_id: newSubreddit.id,
                        title: formData.postTitle,
                        username: session?.user?.name,
                    }
                })

                console.log('New post added', newPost)

            } else {
                //user existing subreddit
                console.log('Using existing subreddit')
                console.log(subredditListByTopic)


                const image = formData.postImage || ''

                const { data: { insertPost: newPost } } = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        subreddit_id: subredditListByTopic[0].id,
                        title: formData.postTitle,
                        username: session?.user?.name,
                    }
                })
            }
            //after post has been added
            setValue('postBody', '')
            setValue('postImage', '')
            setValue('postTitle', '')
            setValue('subreddit', '')

            toast.success('New Post Created!', {
                id: notification
            })

        } catch (error) {
            toast.error('Whoops something went wrong')
            console.log(error)
        }
    })



    return (
        <form onSubmit={onSubmit} className='sticky top-16 z-50 bg-white border-rounded-md border-gray-300 p-2'>
            <div className='flex items-center space-x-3'>
                {/* Avatar */}
                <Avatar />
                <input
                    {...register('postTitle', { required: true })}
                    disabled={!session}
                    className='flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none'
                    type='text'
                    placeholder={
                        session ?
                            'Create a post by entering a title!'
                            :
                            'Sign in to post'
                    }
                />

                <PhotoIcon
                    onClick={() => setImageBoxOpen(!imageBoxOpen)}
                    className={`h-6 cursor-pointer text-gray-300
                    ${imageBoxOpen && 'text-blue-300'}`}
                />
                <LinkIcon className='h-6 text-gray-300' />
            </div>

            {!!watch('postTitle') && (
                <div>
                    {/* Body */}
                    <div className='flex items-center px-2'>
                        <p className='min-w-[90px]'>Body:</p>
                        <input
                            className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                            {...register('postBody')}
                            type='text'
                            placeholder='Text (optional)'
                        />
                    </div>
                    <div className='flex items-center px-2'>
                        <p className='min-w-[90px]'>SubReddit:</p>
                        <input
                            className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                            {...register('subreddit', { required: true })}
                            type='text'
                            placeholder='i.e nextjs'
                        />
                    </div>

                    {imageBoxOpen && (
                        <div className='flex items-center px-2'>
                            <p className='min-w-[90px]'>Image URL:</p>
                            <input
                                className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                                {...register('postImage')}
                                type='text'
                                placeholder='Optional...'
                            />
                        </div>
                    )}

                    {/* Errors */}
                    {Object.keys(errors).length > 0 && (
                        <div>
                            {errors.postTitle?.type === 'required' && (
                                <p className='space-y-2 p-2 text-red-500'>A Post Title is required</p>
                            )}

                            {errors.subreddit?.type === 'required' && (
                                <p className='space-y-2 p-2 text-red-500'>A Subreddit is required</p>
                            )}

                        </div>
                    )}

                    {!!watch('postTitle') && (
                        <button type='submit' className='w-full rounded-full bg-blue-400 text-white'>
                            Create Post
                        </button>
                    )}
                </div>
            )}
        </form>
    )
})

export default PostBox
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import React from 'react'
import Post from './Post'

type Props = {
    topic?: string
}

const Feed = ({ topic }: Props) => {
    const query = topic ? GET_ALL_POSTS_BY_TOPIC : GET_ALL_POSTS;
    const { data, error } = useQuery(query, {
        variables: {
            topic: topic
        }
    });
    const posts: Post[] = topic ? data?.postListByTopic : data?.postList;


    return (
        <div className='mt-5 space-y-4'>
            {posts?.map((post: Post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
}

export default Feed;

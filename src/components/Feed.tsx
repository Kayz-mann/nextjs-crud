import { GET_ALL_POSTS } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import React from 'react'
import Post from './Post'

const Feed = () => {
    const { data, error } = useQuery(GET_ALL_POSTS);
    const posts = data?.postList;

    console.log('post list', posts)


    return (
        <div>
            {posts?.map((post: Post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
}

export default Feed;

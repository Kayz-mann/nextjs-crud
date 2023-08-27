import { gql } from "@apollo/client";

export const GET_SUBREDDIT_BY_TOPIC = gql`
query MyQuery($topic: String!) {
    subredditListByTopic(topic: $topic) {
        id
        topic
        created_at
    }
}
`

export const GET_ALL_POSTS = gql`
query MyQuery{
    postList{
        body
        created_at
        id
        image
        title
        subreddit_id
        username
        comment {
            created_at
            id
            post
            text
            username
        }
        subreddit {
            created_at
            id
            topic
        }
        vote {
            created_at
            id
            post_id
            upvote
            username
        }
    }
}
`

export const GET_ALL_POSTS_BY_TOPIC = gql`
query MyQuery($topic: String!){
    postListByTopic(topic: $topic) {
        body
        created_at
        id
        image
        title
        subreddit_id
        username
        comment {
            created_at
            id
            post
            text
            username
        }
        subreddit {
            created_at
            id
            topic
        }
        vote {
            created_at
            id
            post_id
            upvote
            username
        }
    }
}
`

export const GET_POST_BY_POST_ID = gql`
query MyQuery($post_id: ID!){
    postListByPostId(post_id: $post_id) {
        body
        created_at
        id
        image
        title
        subreddit_id
        username
        comment {
            created_at
            id
            post
            text
            username
        }
        subreddit {
            created_at
            id
            topic
        }
        vote {
            created_at
            id
            post_id
            upvote
            username
        }
    }
}
`

export const GET_ALL_VOTES_BY_POST_ID = gql`
query MyQuery($id: ID!) {
    votesByPostId(id: $id) {
        created_at
        id
        post_id
        upvote
        username
    }
}
`

export const GET_SUBREDDITS_WITH_LIMIT = gql`
query MyQuery($limit: Int!) {
    subredditListLimit(limit: $limit) {
    created_at
    id
    topic
}
}
`

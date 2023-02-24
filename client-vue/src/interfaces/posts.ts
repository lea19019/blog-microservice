import type { Comment } from "./comments"
interface Post {
    id: string
    title: string
    comments: Comment[]
}

interface Posts {
    [id: string]: Post
}

export type { Post, Posts }
"use server";

import { createPost } from "./lib/posts-store";

export async function createPostAction(title) {
    const post = createPost(title);
    return post;
}

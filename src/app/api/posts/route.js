import { createPost, getPosts } from "../../lib/posts-store";

export async function GET() {
    return Response.json({ posts: getPosts() });
}

export async function POST(request) {
    const body = await request.json();
    const post = createPost(body.title);
    return Response.json({ post });
}

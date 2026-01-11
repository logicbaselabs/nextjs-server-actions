import { getPosts } from "@/app/lib/posts-store";

export async function GET() {
    return Response.json({ posts: getPosts() });
}


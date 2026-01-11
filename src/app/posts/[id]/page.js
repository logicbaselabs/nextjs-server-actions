import { getPostById } from "@/app/lib/posts-store";
import Link from "next/link";

export default async function PostPage({ params }) {
    const { id } = await params;

    const post = await getPostById(id);

    if (!post)
        return (
            <main>
                <p>Post not found.</p>
            </main>
        );

    return (
        <main>
            <h1>{post.title}</h1>
            <Link href={"/"}>Back</Link>
        </main>
    );
}

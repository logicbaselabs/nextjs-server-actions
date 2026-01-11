"use client";

import { useEffect, useState } from "react";
import { createPostAction } from "./actions";

export default function PostsDemo() {
    const [title, setTitle] = useState("");
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const fetchPosts = async () => {
        const response = await fetch("/api/posts");
        const data = await response.json();
        setPosts(data.posts);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSaving(true);

        const createdPost = await createPostAction(title);
        setPosts((prevPosts) => [createdPost, ...prevPosts]);
        setTitle("");
        setIsSaving(false);
    };

    return (
        <section>
            <h1>Beyond Components</h1>
            <p>
                We are going to build a tiny posts feature and use it to
                understand mutations.
            </p>

            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button type="submit" disabled={isSaving}>
                    Add post
                </button>
            </form>

            {isLoading && <p>Loading posts...</p>}

            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </section>
    );
}

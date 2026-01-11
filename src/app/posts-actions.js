"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createPost, deletePost, updatePostTitle } from "./lib/posts-store";

const createPostSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(80, "Title is too long"),
});

export async function createPostAction(prevState, formData) {
    const cookieStore = await cookies();
    const raw = Object.fromEntries(formData);
    const result = createPostSchema.safeParse(raw);

    if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        return {
            message: "Please fix the errors and try again.",
            fieldErrors: { title: fieldErrors.title?.[0] || "" },
        };
    }

    const post = createPost(result.data.title);
    revalidatePath("/");

    cookieStore.set("lastCreatedTitle", post.title);

    redirect(`/posts/${post.id}`);
    return { message: "Post added.", fieldErrors: { title: "" } };
}

export async function updatePostTitleAction(postId, formData) {
    const raw = Object.fromEntries(formData);
    const result = createPostSchema.safeParse(raw);
    if (!result.success) return;
    updatePostTitle(postId, result.data.title);
    revalidatePath("/");
}

export async function deletePostAction(postId) {
    deletePost(postId);
    revalidatePath("/");
}

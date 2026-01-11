import { revalidatePath } from "next/cache";
import Form from "next/form";
import { cookies } from "next/headers";
import CreatePostForm from "./create-post-form";
import { createPost, getPosts } from "./lib/posts-store";
import PostTitleInput from "./post-title-input";
import { deletePostAction, updatePostTitleAction } from "./posts-actions";
import RefreshButton from "./refresh-button";
import SearchButton from "./search-button";

export default async function Page() {
    async function createPostFromForm(formData) {
        "use server";
        await new Promise((resolve) => setTimeout(resolve, 800));
        const title = formData.get("title");
        createPost(title);
        revalidatePath("/");
    }
    const cookieStore = await cookies();
    const lastCreatedTitle = cookieStore.get("lastCreatedTitle")?.value || "";

    const posts = getPosts();
    return (
        <main>
            <h1>Beyond Components</h1>
            <p>In this section, our form will call a Server Action directly.</p>

            <Form action={"/search"}>
                <input name="query" />
                <SearchButton />
            </Form>

            <CreatePostForm />
            <RefreshButton />
            {lastCreatedTitle && <p>Last created: {lastCreatedTitle}</p>}
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <form
                            action={updatePostTitleAction.bind(null, post.id)}
                        >
                            <PostTitleInput
                                name="title"
                                defaultValue={post.title}
                                required
                            />
                            <button type="submit">Save</button>
                            <button
                                type="submit"
                                formAction={deletePostAction.bind(
                                    null,
                                    post.id
                                )}
                            >
                                Delete
                            </button>
                        </form>
                    </li>
                ))}
            </ul>
        </main>
    );
}

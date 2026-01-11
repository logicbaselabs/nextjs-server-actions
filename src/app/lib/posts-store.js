let posts = [
    { id: "1", title: "Hello from the server" },
    { id: "2", title: "This survives refresh (until the server restarts)" },
];

export function getPosts() {
    return posts;
}

export function getPostById(id) {
    return posts.find((post) => post.id === id) || null;
}

export function createPost(title) {
    const post = { id: crypto.randomUUID(), title };
    posts = [post, ...posts];
    return post;
}

export function updatePostTitle(postId, title) {
    posts = posts.map((post) =>
        post.id === postId ? { ...post, title } : post
    );
}

export function deletePost(postId) {
    posts = posts.filter((post) => post.id !== postId);
}

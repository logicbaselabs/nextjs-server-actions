"use client";

import { useActionState } from "react";
import { createPostAction } from "./posts-actions";
import SubmitButton from "./submit-button";

const initialState = {
    message: "",
    fieldErrors: { title: "" },
};

export default function CreatePostForm() {
    const [state, formAction, pending] = useActionState(
        createPostAction,
        initialState
    );

    const handleTitleKeyDown = (e) => {
        if (
            (e.ctrlKey || e.metaKey) &&
            (e.key === "Enter" || e.key === "NumpadEnter")
        ) {
            e.preventDefault();
            e.currentTarget.form.requestSubmit();
        }
    };

    return (
        <form action={formAction}>
            <input
                name="title"
                required
                disabled={pending}
                onKeyDown={handleTitleKeyDown}
            />
            {state.fieldErrors.title && (
                <p role="alert">{state.fieldErrors.title}</p>
            )}
            <SubmitButton />
            <p aria-live="polite">{state.message}</p>
        </form>
    );
}

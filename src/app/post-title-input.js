"use client";

export default function PostTitleInput(props) {
    const handleKeyDown = (e) => {
        if (
            (e.ctrlKey || e.metaKey) &&
            (e.key === "Enter" || e.key === "NumpadEnter")
        ) {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
        }
    };
    return <input {...props} onKeyDown={handleKeyDown} />;
}

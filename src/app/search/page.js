import Link from "next/link";

export default async function SearchPage({ searchParams }) {
    const params = await searchParams;
    const query = params?.query || "";

    return (
        <main>
            <h1>Search</h1>
            <p>Query: {query}</p>
            <Link href={"/"}>Back</Link>
        </main>
    );
}

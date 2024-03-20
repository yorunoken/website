import path from "path";
import Link from "next/link";
import { getAllFilesFrontMatter } from "@/lib/mdx";

import "@/app/globals.css";

interface Post {
    title: string;
    description: string;
    slug: string;
}

interface BlogIndexProps {
    posts: Post[];
}

const BlogIndex = ({ posts }: BlogIndexProps) => {
    const centerItems = "flex min-h-screen flex-col items-center justify-center ";

    return (
        <main className={centerItems + "font-mono text-lg antialiased p-8 text-center"}>
            <h1 className="text-2xl font-bold mb-4">All Posts</h1>
            <ul className="list-disc text-left">
                {posts
                    .filter((post) => post.title)
                    .map((post: Post) => {
                        return (
                            <li key={post.slug}>
                                <Link href={`/blog/posts/${post.slug}`}>{post.title}</Link>
                            </li>
                        );
                    })}
            </ul>
            <div className="mt-8">
                <Link href="/">
                    <p className="text-blue-600 hover:underline">Go to Main Menu</p>
                </Link>
            </div>
        </main>
    );
};

export async function getStaticProps() {
    const postsDirectory = path.join(process.cwd(), "src/pages/blog/posts");
    const posts = await getAllFilesFrontMatter<Post>(postsDirectory);

    return {
        props: {
            posts,
        },
    };
}

export default BlogIndex;

import path from "path";
import Link from "next/link";
import { getAllFilesFrontMatter } from "@/lib/mdx";

import "@/app/globals.css";

interface Post {
    title: string;
    description: string;
    slug: string;
}

interface BlogPostsCardProps {
    title: string;
    description: string;
}

interface BlogIndexProps {
    posts: Post[];
}
export default function BlogIndex({ posts }: BlogIndexProps) {
    const centerItems = "flex min-h-screen flex-col items-center justify-center ";

    return (
        <main className={centerItems + "font-mono text-lg antialiased p-8 text-center"}>
            <div className="mt-8">
                <h1 className="text-xl sm:text-3xl font-bold mb-4">Posts</h1>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                    {posts
                        .filter((post) => post.title)
                        .map((post: Post) => {
                            return (
                                <Link href={`/blog/posts/${post.slug}`} key={post.slug}>
                                    <BlogPostsCard title={post.title} description={post.description} />
                                </Link>
                            );
                        })}
                </div>
            </div>
            <div className="mt-8">
                <Link href="/">
                    <p className="text-blue-600 hover:underline">Go to Homepage</p>
                </Link>
            </div>
        </main>
    );
}

export async function getStaticProps() {
    const postsDirectory = path.join(process.cwd(), "src/pages/blog/posts");
    const posts = await getAllFilesFrontMatter<Post>(postsDirectory);

    return {
        props: {
            posts,
        },
    };
}

const BlogPostsCard = ({ title, description }: BlogPostsCardProps) => {
    return (
        <div className="bg-dark bg-opacity-50 border border-gray-300 py-4 px-16 sm:py-6 sm:px-32 text-center transition-all duration-300 hover:bg-opacity-100 hover:bg-neutral-900 hover:shadow-lg">
            <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">{title}</h2>
            <p className="text-sm">{description}</p>
        </div>
    );
};

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";

import "@/app/globals.css";

interface FrontMatter {
    title: string;
}

interface BlogPostProps {
    source: {
        compiledSource: string;
        scope: Record<string, unknown>;
        frontmatter: FrontMatter;
    };
}

const BlogPost = ({ source }: BlogPostProps) => {
    const centerItems = "flex min-h-screen flex-col items-center justify-center ";

    return (
        <main className={centerItems + "font-mono text-lg antialiased p-8 text-center"}>
            <h1 className="text-2xl font-bold mb-4">{source.frontmatter.title}</h1>
            <MDXRemote {...source} />
            <div className="mt-8">
                <Link href="/blog">
                    <p className="text-blue-600 hover:underline">Go to Blog</p>
                </Link>
                <Link href="/">
                    <p className="text-blue-600 hover:underline">Go to Home</p>
                </Link>
            </div>
        </main>
    );
};

export async function getStaticPaths() {
    const postsDirectory = path.join(process.cwd(), "src/pages/blog/posts");
    const posts = fs.readdirSync(postsDirectory);

    const paths = posts
        .filter((post) => post.endsWith(".mdx"))
        .map((post) => ({
            params: {
                slug: post.replace(/\.mdx?$/, ""),
            },
        }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const postsDirectory = path.join(process.cwd(), "src/pages/blog/posts");
    const filePath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(fileContent);
    const mdxSource = await serialize(content);

    return {
        props: {
            source: {
                compiledSource: mdxSource.compiledSource,
                scope: mdxSource.scope,
                frontmatter: data as FrontMatter,
            },
        },
    };
}
export default BlogPost;

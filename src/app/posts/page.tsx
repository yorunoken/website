import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Posts() {
    const postsData = getSortedPostsData();
    const background = "https://yorunoken.s-ul.eu/I7Y7HGGI";

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <Image
                    src={background}
                    alt="bg"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-center mb-4 text-purple-300">
                        Yoru{"'"}s Blog
                    </h1>
                    <p className="text-center text-xl text-gray-400">
                        Thoughts on Tech, Anime, and Everything in Between
                    </p>
                </header>

                <div className="mb-8 flex justify-between items-center">
                    <Input
                        type="text"
                        placeholder="Search posts..."
                        className="bg-gray-800 border-purple-500 text-gray-200 placeholder-gray-400 w-64"
                    />
                    <Link href="/">
                        <Button
                            variant="outline"
                            className="bg-gray-800 bg-opacity-90 hover:bg-gray-700 text-purple-300 border-purple-500"
                        >
                            Back to Main Page
                        </Button>
                    </Link>
                </div>

                <main className="space-y-8">
                    {postsData.map((post) => (
                        <Card
                            key={post.id}
                            className="bg-gray-800 bg-opacity-90 border-purple-500 border-2 overflow-hidden transition-all hover:border-purple-400"
                        >
                            <CardHeader>
                                <CardTitle className="text-2xl text-purple-300">
                                    <Link
                                        href={`/posts/${post.id}`}
                                        className="hover:underline"
                                    >
                                        {post.title}
                                    </Link>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4">
                                    {post.description}
                                </p>
                                <div className="flex justify-between items-center text-sm text-gray-400">
                                    <span>{post.author}</span>
                                    <span>
                                        {new Date(post.date).toLocaleString(
                                            "en-US",
                                            {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            },
                                        )}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </main>
            </div>
        </div>
    );
}

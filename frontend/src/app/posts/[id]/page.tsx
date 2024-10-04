import { Button } from "@/components/ui/button";
import { getPostData } from "@/lib/posts";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import {
    getComments,
    onComment,
    onCommentDelete,
    onCommentLike,
    onCommentUnLike,
    // post
    addLike,
    deleteLike,
    getPostDetails,
} from "./lib";

import Comments from "./components/comments";
import { PostLike } from "./components/postLike";

type Props = {
    params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const postData = await getPostData(params.id);

    return {
        title: `Blog Post | ${postData.title}`,
        description: postData.description,
    };
}

export default async function Post({ params }: Props) {
    const postId = params.id;
    const postData = await getPostData(postId);
    const background = "https://yorunoken.s-ul.eu/I7Y7HGGI";

    const session = await getServerSession(authOptions);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <Image
                    src={background}
                    alt="Background"
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-5xl font-bold mb-4 text-purple-300 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        {postData.title}
                    </h1>
                    <div className="text-xl text-gray-400">
                        {new Date(postData.date).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </header>

                <div className="text-center space-x-4 mb-4">
                    <Link href="/posts">
                        <Button
                            variant="outline"
                            className="bg-gray-800 bg-opacity-90 hover:bg-gray-700 text-purple-300 border-purple-500"
                        >
                            Back to All Posts
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button
                            variant="outline"
                            className="bg-gray-800 bg-opacity-90 hover:bg-gray-700 text-purple-300 border-purple-500"
                        >
                            Back to Main Page
                        </Button>
                    </Link>
                </div>

                <main className="bg-gray-800 bg-opacity-90 border-purple-500 border-2 rounded-lg p-8 mb-8 shadow-lg">
                    <div
                        className="prose prose-invert prose-lg max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: postData.contentHtml || "",
                        }}
                    />
                    <PostLike
                        session={session}
                        postId={postId}
                        addLike={addLike}
                        deleteLike={deleteLike}
                        getPostDetails={getPostDetails}
                    />
                </main>

                <Comments
                    session={session}
                    getComments={getComments}
                    postId={postId}
                    onCommentLike={onCommentLike}
                    onCommentUnLike={onCommentUnLike}
                    onComment={onComment}
                    onCommentDelete={onCommentDelete}
                />
            </div>
        </div>
    );
}

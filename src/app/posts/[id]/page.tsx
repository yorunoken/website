import { Button } from "@/components/ui/button";
import { getPostData } from "@/lib/posts";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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
    const postData = await getPostData(params.id);
    const background = "https://yorunoken.s-ul.eu/I7Y7HGGI";

    console.log(postData);

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
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-center mb-4 text-purple-300">
                        {postData.title}
                    </h1>
                    <div className="text-center text-xl text-gray-400">
                        {new Date(postData.date).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </header>

                <main className="bg-gray-800 bg-opacity-90 border-purple-500 border-2 rounded-lg p-8 mb-8">
                    <div
                        className="prose prose-invert prose-lg max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: postData.contentHtml || "",
                        }}
                    />
                </main>

                <div className="text-center space-x-4">
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
            </div>
        </div>
    );
}

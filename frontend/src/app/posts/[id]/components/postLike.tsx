"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { PostDetails } from "@/interfaces/post";
import { Heart } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { BsDiscord } from "react-icons/bs";

type PostLikeProps = {
    session: Session | null;
    postId: string;
    getPostDetails(
        session: Session | null,
        postId: string,
    ): Promise<PostDetails>;
    addLike(session: Session | null, postId: string): Promise<void>;
    deleteLike(session: Session | null, postId: string): Promise<void>;
};

export function PostLike({
    session,
    postId,
    addLike,
    deleteLike,
    getPostDetails,
}: PostLikeProps) {
    const [refresh, setRefresh] = useState(0);
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRefresh((prev) => prev + 1);
        }, 20000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        async function fetchPostDetails() {
            try {
                const postDetails: PostDetails = await getPostDetails(
                    session,
                    postId,
                );
                setLikeCount(postDetails.likers.length);
                setIsPostLiked(
                    postDetails.likers.includes(session?.user?.id ?? ""),
                );
            } catch (e) {
                console.error(e);
            }
        }

        fetchPostDetails();
    }, [refresh, getPostDetails, setIsPostLiked, session, postId]);

    async function handleLike() {
        await addLike(session, postId);
        setRefresh((prev) => prev + 1);
    }

    async function handleUnlike() {
        await deleteLike(session, postId);
        setRefresh((prev) => prev + 1);
    }

    return session ? (
        <Button
            variant="ghost"
            size="sm"
            className="text-purple-300 hover:bg-gray-700 group"
            onClick={isPostLiked ? handleUnlike : handleLike}
        >
            <Heart
                className={`w-4 h-4 mr-2 transition-all duration-300 ease-in-out
                ${
                    isPostLiked
                        ? "fill-current text-red-500 scale-110"
                        : "text-purple-300 scale-100"
                }
                group-hover:scale-125`}
            />
            {likeCount}
        </Button>
    ) : (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-300 hover:bg-gray-700"
                >
                    <Heart className="w-4 h-4 mr-2" />
                    {likeCount}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-800 border-purple-500">
                <DialogHeader>
                    <DialogTitle>Sign in required</DialogTitle>
                </DialogHeader>
                <p className="text-gray-300">
                    Please sign in with Discord to like posts.
                </p>
                <Button
                    className="bg-purple-600 hover:bg-purple-700 text-gray-200"
                    onClick={() => signIn("discord")}
                >
                    <BsDiscord className="mr-2 h-4 w-4" />
                    Login with Discord
                </Button>
            </DialogContent>
        </Dialog>
    );
}

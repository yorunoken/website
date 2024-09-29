"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Comment as CommentType } from "@/interfaces/comment";
import { Heart, Trash2 } from "lucide-react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BsDiscord } from "react-icons/bs";

type CommentsProps = {
    session: Session | null;
    postId: string;
    getComments(postId: string): Promise<Array<CommentType>>;
    onCommentLike(session: Session | null, commentId: number): Promise<void>;
    onCommentUnLike(session: Session | null, commentId: number): Promise<void>;
    onComment(
        session: Session | null,
        postId: string,
        text: string,
    ): Promise<void>;
    onCommentDelete(session: Session | null, commentId: number): Promise<void>;
};

export default function Comments({
    session,
    postId,
    getComments,
    onCommentLike,
    onCommentUnLike,
    onComment,
    onCommentDelete,
}: CommentsProps) {
    const [refresh, setRefresh] = useState(0);
    const [comments, setComments] = useState<Array<CommentType>>([]);
    const [newCommentText, setNewCommentText] = useState("");

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRefresh((prev) => prev + 1);
        }, 20000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        async function fetchComments() {
            try {
                const comments = await getComments(postId);
                setComments(comments);
            } catch (e) {
                console.error(e);
            }
        }

        fetchComments();
    }, [refresh, getComments, postId]);

    async function handleLike(commentId: number) {
        await onCommentLike(session, commentId);
        setRefresh((prev) => prev + 1);
    }

    async function handleUnlike(commentId: number) {
        console.log("wasup");
        await onCommentUnLike(session, commentId);
        setRefresh((prev) => prev + 1);
    }

    async function handleComment() {
        await onComment(session, postId, newCommentText);
        setNewCommentText("");
        setRefresh((prev) => prev + 1);
    }

    async function handleCommentDelete(commentId: number) {
        await onCommentDelete(session, commentId);
        setRefresh((prev) => prev + 1);
    }

    return (
        <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-4 text-purple-300">
                Comments
            </h2>
            <PostComment
                session={session}
                handleComment={handleComment}
                newCommentText={newCommentText}
                setNewCommentText={setNewCommentText}
            />
            {comments &&
                comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        session={session}
                        comment={comment}
                        handleLike={handleLike}
                        handleCommentDelete={handleCommentDelete}
                        handleUnlike={handleUnlike}
                    />
                ))}
        </section>
    );
}

function Comment({
    session,
    comment,
    handleLike,
    handleCommentDelete,
    handleUnlike,
}: {
    session: Session | null;
    comment: CommentType;
    handleLike(commentId: number): Promise<void>;
    handleUnlike(commentId: number): Promise<void>;
    handleCommentDelete(commentId: number): Promise<void>;
}) {
    function onLike() {
        handleLike(comment.id);
    }

    function onUnLike() {
        handleUnlike(comment.id);
    }

    function onCommentDelete() {
        handleCommentDelete(comment.id);
    }

    const isCommentLiked = comment.likers.includes(session?.user?.id ?? "");
    const isCommentOwner = comment.discord_id === session?.user?.id;

    return (
        <Card className="mt-4 bg-gray-800 border-purple-500">
            <CardHeader>
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarFallback>{comment.username[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-purple-300">
                            {comment.username}
                        </p>
                        <p className="text-sm text-gray-400">
                            {new Date(comment.created_at).toLocaleString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                },
                            )}
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-gray-300">{comment.text}</p>
            </CardContent>
            <CardFooter>
                {session ? (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-300 hover:bg-gray-700 group"
                        onClick={isCommentLiked ? onUnLike : onLike}
                    >
                        <Heart
                            className={`w-4 h-4 mr-2 transition-all duration-300 ease-in-out
                                ${
                                    isCommentLiked
                                        ? "fill-current text-red-500 scale-110"
                                        : "text-purple-300 scale-100"
                                }
                                group-hover:scale-125`}
                        />
                        {comment.likes}
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
                                {comment.likes}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-gray-800 border-purple-500">
                            <DialogHeader>
                                <DialogTitle>Sign in required</DialogTitle>
                            </DialogHeader>
                            <p className="text-gray-300">
                                Please sign in with Discord to like comments.
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
                )}
                {isCommentOwner && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:bg-gray-700 hover:text-red-500"
                        onClick={onCommentDelete}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}

function PostComment({
    session,
    newCommentText,
    setNewCommentText,
    handleComment,
}: {
    session: Session | null;
    newCommentText: string;
    setNewCommentText: Dispatch<SetStateAction<string>>;
    handleComment(): void;
}) {
    if (session === null) {
        return (
            <Card className="bg-gray-800 border-purple-500">
                <CardHeader>
                    <div className="flex space-x-4">
                        <Avatar>
                            <AvatarFallback>{"U"}</AvatarFallback>
                        </Avatar>
                        <Textarea
                            placeholder="Add a comment..."
                            readOnly
                            className="flex-grow max-h-60 bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 hover:cursor-not-allowed"
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardFooter className="flex justify-end">
                    <Button
                        className="bg-purple-600 hover:bg-purple-700 text-gray-200"
                        onClick={() => signIn("discord")}
                    >
                        <BsDiscord className="mr-2 h-4 w-4" />
                        Login with Discord to Comment
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="bg-gray-800 border-purple-500">
            <CardHeader>
                <div className="flex space-x-4">
                    <Avatar>
                        <AvatarFallback>
                            {session.user.name ? session.user.name[0] : "U"}
                        </AvatarFallback>
                    </Avatar>
                    <Textarea
                        placeholder="Add a comment..."
                        className="flex-grow max-h-60 bg-gray-700 border-gray-600 focus:border-purple-500 text-gray-200 placeholder-gray-400"
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                    />
                </div>
            </CardHeader>
            <CardFooter className="flex justify-between">
                <Button
                    variant="outline"
                    className="hover:bg-purple-700 bg-transparent border-2 border-purple-700"
                    onClick={() => signOut()}
                >
                    <BsDiscord className="mr-2 h-4 w-4" />
                    Log out
                </Button>
                <Button
                    className="bg-purple-600 hover:bg-purple-700 text-gray-200"
                    onClick={handleComment}
                >
                    Post Comment
                </Button>
            </CardFooter>
        </Card>
    );
}

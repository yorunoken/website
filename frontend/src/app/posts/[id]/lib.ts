import { Comment } from "@/interfaces/comment";
import { BACKEND_URL } from "@/lib";
import { Session } from "next-auth";

// POST

export async function getPostDetails(session: Session | null, postId: string) {
    "use server";

    const response = await fetch(`${BACKEND_URL}/api/posts/${postId}`);

    if (!response.ok) {
        console.error(await response.text());
        throw new Error("Couldn't get post details.");
    }

    return await response.json();
}

export async function addLike(session: Session | null, postId: string) {
    "use server";

    if (!session) {
        throw new Error("Unauthorized.");
    }

    await fetch(`${BACKEND_URL}/api/posts/${postId}/like`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            discordId: session.user.id,
        }),
    });
}

export async function deleteLike(session: Session | null, postId: string) {
    "use server";

    if (session === null) {
        throw new Error("Unauthorized.");
    }

    await fetch(
        `${BACKEND_URL}/api/user/${session.user.id}/posts/${postId}/unlike`,
        { method: "DELETE" },
    );
}

// COMMENTS

export async function getComments(postId: string): Promise<Array<Comment>> {
    "use server";

    const response = await fetch(`${BACKEND_URL}/api/posts/${postId}/comments`);

    if (!response.ok) {
        throw new Error("Couldn't get post comments.");
    }

    return await response.json();
}

export async function onCommentLike(
    session: Session | null,
    commentId: number,
) {
    "use server";

    if (!session) {
        throw new Error("Unauthorized.");
    }

    await fetch(`${BACKEND_URL}/api/comment/${commentId}/like`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            discordId: session.user.id,
        }),
    });
}

export async function onCommentUnLike(
    session: Session | null,
    commentId: number,
) {
    "use server";

    if (session === null) {
        throw new Error("Unauthorized.");
    }

    await fetch(
        `${BACKEND_URL}/api/user/${session.user.id}/comment/${commentId}/unlike`,
        { method: "DELETE" },
    );
}

export async function onComment(
    session: Session | null,
    postId: string,
    text: string,
) {
    "use server";

    if (session === null) {
        throw new Error("Unauthorized.");
    }

    await fetch(`${BACKEND_URL}/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            discordId: session.user.id,
            username: session.user.name ?? "John",
            text,
        }),
    });
}

export async function onCommentDelete(
    session: Session | null,
    commentId: number,
) {
    "use server";

    if (session === null) {
        throw new Error("Unauthorized.");
    }

    await fetch(
        `${BACKEND_URL}/api/user/${session.user.id}/comment/${commentId}`,
        { method: "DELETE" },
    );
}

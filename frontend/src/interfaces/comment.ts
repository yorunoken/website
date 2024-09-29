export interface Comment {
    id: number;
    blog_post_id: string;
    discord_id: string;
    username: string;
    text: string;
    likes: number;
    created_at: string;
    likers: Array<string>;
}

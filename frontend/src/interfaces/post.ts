export interface PostData {
    id: string;
    title: string;
    date: string;
    description: string;
    author: string;
    content?: string;
    contentHtml?: string;
}

export interface PostDetails {
    id: string;
    likers: Array<string>;
}

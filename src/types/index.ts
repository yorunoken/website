export interface ImageButtonProps {
    src: string;
    alt: string;
    link: string;
}

export interface ProjectCardProps {
    title: string;
    description: string;
}

export interface Lanyard {
    data: {
        discord_user: {
            id: string;
            username: string
            avatar: string
            discriminator: string
            bot: boolean
            global_name: string | null
            display_name: string | null
            public_flags: number
        }
    }
    success: boolean
}

export interface Github {
    name: string;
    owner: {
        login: string;
        avatar_url: string;
    }
    description: string;
    created_at: string
    updated_at: string;
    pushed_at: string;
    watchers: number;
    forks_count: number;
    default_branch: string;
    topics: Array<string>
    language: string;
    license: {
        key: "apache-2.0"
        name: "Apache License 2.0"
        spdx_id: "Apache-2.0"
        url: "https://api.github.com/licenses/apache-2.0"
        node_id: "MDc6TGljZW5zZTI="
    }
}

export interface BlogIndexProps {
    posts: string[];
}
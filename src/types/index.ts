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
"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";

import GithubWhite from "@/images/github.svg";
import TwitchWhite from "@/images/twitch.svg";
import TwitterWhite from "@/images/twitter.svg";
import YoutubeWhite from "@/images/youtube.svg";
import Loading from "@/images/loading.svg";
import { ImageButtonProps, Lanyard, ProjectCardProps } from "@/types";

const centerItems = "flex min-h-screen flex-col items-center justify-center ";

const discordId = "372343076578131968";

export default function Home() {
    const [discordPfp, setDiscordPfp] = useState<string | null>(null);
    const [discordUsername, setDiscordUsername] = useState<string | null>(null);

    useEffect(() => {
        async function fetchDiscordData() {
            const req = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
            const { data } = (await req.json()) as Lanyard;
            setDiscordPfp(`https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}?size=1024`);
            setDiscordUsername(data.discord_user.username);
        }

        fetchDiscordData();
    }, []);

    return (
        <main className={centerItems + "font-mono text-lg antialiased p-8 text-center"}>
            <div className="relative group mb-8 rounded-3xl overflow-hidden transition-all duration-300 hover:scale-110 hover:opacity-100">
                <a href={`https://discord.com/users/${discordId}`} target="_blank" rel="noopener noreferrer">
                    <Image src={discordPfp ?? Loading} alt="Discord PFP" width={150} height={150} className="rounded-3xl" unoptimized={true} />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-60 rounded-3xl">
                        <p className="text-white text-base">{discordUsername}</p>
                    </div>
                </a>
            </div>

            <p className="mb-8 text-2xl">Hello, I&apos;m Yoru!</p>
            <p className="text-sm md:text-lg">I like cute things ヾ(≧▽≦*)o</p>
            <p className="text-sm md:text-lg">I&apos;m a software developer specialized in TypeScript.</p>
            <p className="text-sm md:text-lg">I mostly play games and listen to music in my free time:3c</p>
            <Link href="/blog">
                <p className="text-sm md:text-lg font-bold underline underline-offset-4 text-red-300">Check out my blog!</p>
            </Link>

            <div className="mt-8">
                <h1 className="text-xl font-bold">Socials</h1>
                <div className="flex items-center justify-center space-x-3 md:space-x-6 w-10/12 md:w-full">
                    <ImageButton src={GithubWhite} alt="GitHub" link="https://github.com/yorunoken" />
                    <ImageButton src={TwitchWhite} alt="Twitch" link="https://www.twitch.tv/yorunokenosu" />
                    <ImageButton src={TwitterWhite} alt="Twitter" link="https://twitter.com/ken_yoru" />
                    <ImageButton src={YoutubeWhite} alt="YouTube" link="https://www.youtube.com/@yorunoken" />
                </div>
            </div>

            <div className="mt-8">
                <h1 className="text-xl font-bold mb-4">Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <ProjectCard title="Lemmy Karma Calculator" description="A Firefox extension that displays how much karma you have in the Lemmyverse." />
                    <ProjectCard title="HanamiBot" description="A Discord bot specialized for osu!game with many features." />
                    <ProjectCard title="CCTV Discord Bot" description="A Discord bot for scraping unsecured CCTV cameras and displaying them randomly." />
                    <ProjectCard title="MCSR Bot" description="A Discord bot that integrates MCSR Ranked API." />
                </div>
            </div>
        </main>
    );
}

const ImageButton = ({ src, alt, link }: ImageButtonProps) => {
    return (
        <div className="relative group mt-4">
            <a href={link} target="_blank" rel="noopener noreferrer" className="relative overflow-hidden">
                <Image src={src} alt={alt} width={70} height={100} className="dark-mode opacity-70 transition-all duration-300 hover:scale-110 hover:opacity-100" />
            </a>
        </div>
    );
};

const ProjectCard = ({ title, description }: ProjectCardProps) => {
    return (
        <Link href={`/projects/${title.toLowerCase().replace(/\s/g, "")}`}>
            <div className="bg-dark bg-opacity-50 border border-gray-300 p-5 rounded-lg transition-all duration-300 hover:bg-opacity-100 hover:bg-neutral-900 hover:shadow-lg">
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <p className="text-sm">{description}</p>
            </div>
        </Link>
    );
};

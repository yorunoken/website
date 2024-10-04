import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SkillCard from "@/components/cards/skillCard";
import ProjectCard, { Project } from "@/components/cards/projectCard";
import Image from "next/image";
import Link from "next/link";

export default function PersonalWebsite() {
    const skills = [
        {
            title: "Programming Languages",
            items: ["JavaScript/TypeScript", "Go", "Rust"],
        },
        {
            title: "Frameworks",
            items: ["Next.js", "React", "Svelte"],
        },
        {
            title: "IDEs",
            items: ["Visual Studio Code", "Visual Studio", "Zed"],
        },
        {
            title: "Cloud",
            items: ["Google", "Hetzner", "AWS"],
        },
        {
            title: "Operating Systems",
            items: ["Arch Linux", "Windows 10/11", "Linux Mint", "Ubuntu"],
        },
        {
            title: "Human Languages",
            items: ["English", "Turkish", "YAPanese"],
        },
    ];

    const projects: Array<Project> = [
        {
            title: "HanamiBot",
            description: "A powerful Discord bot developed for osu!",
            backgroundUrl: "https://yorunoken.s-ul.eu/vzVcxxIs",
            github: "https://github.com/yorunoken/HanamiBot",
            website: "https://hanami.yorunoken.com",
        },
        {
            title: "Hanami Manga",
            description:
                "A newly designed manga website written using Next.js!",
            backgroundUrl: "https://yorunoken.s-ul.eu/5gTl3ROv",
            github: "https://github.com/yorunoken/hanami-manga",
            website: "https://manga.yorunoken.com",
        },
        {
            title: "YAUS",
            description: "Yet another URL shortener.",
            backgroundUrl: "https://yorunoken.s-ul.eu/G7WEWTA0",
            github: "https://github.com/yorunoken/YAUS",
            website: "https://short.yorunoken.com",
        },
        {
            title: "DMU",
            description:
                "DMU (Discord Mass Uploader) is a tool that allows users to upload large files to Discord without needing Discord nitro.",
            backgroundUrl: "https://yorunoken.s-ul.eu/NfBW96tK",
            github: "https://github.com/yorunoken/discord-mass-uploader",
        },
        {
            title: "Calissaydim",
            description:
                "A fun website to find out what universities you could've landed if you had studied instead of playing games.",
            coAuthors: [
                {
                    name: "Burak",
                    url: "https://www.linkedin.com/in/burak-tanr%C4%B1verdi-a15b88260/",
                },
            ],
            backgroundUrl: "https://yorunoken.s-ul.eu/lBk5GuSB",
            github: "https://github.com/yorunoken/calissaydim",
            website: "https://calissaydim.com.tr",
        },
        {
            title: "fun APIs",
            description: "Random API things that I add in my free time :>",
            backgroundUrl: "https://yorunoken.s-ul.eu/0BBr9h9e",
            github: "https://github.com/yorunoken/fun-api",
            website: "https://fun.yorunoken.com",
        },
        {
            title: "Hatsune Miku GRUB",
            description: "A Grub theme of Hatsune Miku",
            backgroundUrl:
                "https://raw.githubusercontent.com/yorunoken/HatsuneMiku/refs/heads/main/background.png",
            github: "https://github.com/yorunoken/HatsuneMiku",
        },
        {
            title: "dotfiles",
            description: "My dotfiles for my Arch Linux setup.",
            backgroundUrl:
                "https://raw.githubusercontent.com/yorunoken/dotfiles/refs/heads/main/screenshots/2.png",
            github: "https://github.com/yorunoken/dotfiles",
        },
    ];

    const socials = [
        { title: "GitHub", href: "https://github.com/yorunoken" },
        { title: "Twitter", href: "https://x.com/ken_yoru" },
        { title: "YouTube", href: "https://youtube.com/@yorunoken" },
        {
            title: "Discord",
            href: "https://discord.com/users/372343076578131968",
        },
    ];

    const background = "https://yorunoken.s-ul.eu/I7Y7HGGI";

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-10 blur-sm">
                <Image
                    src={background}
                    alt="Floral Background"
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>

            <div className="relative z-99 max-w-4xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-center mb-4 text-purple-300">
                        Yoru{"'"}s Portfolio
                    </h1>
                    <p className="text-center text-xl text-gray-400">
                        Web Developer & Computer Science Enthusiast
                    </p>
                </header>

                <main className="space-y-12">
                    <section>
                        <h2 className="text-3xl font-semibold mb-4 text-purple-400 text-center sm:text-left">
                            About Me
                        </h2>
                        <Card className="bg-gray-800 bg-opacity-90 border-purple-500 border-2">
                            <CardContent className="pt-6">
                                <p className="text-lg">
                                    Hello! I{"'"}m Yoru. I love cute things and
                                    I{"'"}m studying to become a comp sci major!
                                    I mostly play games and listen to music in
                                    my free time. ⸜(｡˃ ᵕ ˂ )⸝♡
                                </p>
                                <p className="text-lg">
                                    I hope we get along! :3
                                </p>
                                <p className="text-lg">
                                    If you would be so kind as to
                                    <Link href="/support">
                                        <Button
                                            variant="outline"
                                            className="mx-2 p-2 bg-gray-800 bg-opacity-90 hover:bg-gray-700 text-purple-300 border-purple-500"
                                        >
                                            Support me
                                        </Button>
                                    </Link>
                                    that would make me very happy!
                                </p>
                                <p className="text-lg">
                                    You can also
                                    <Link href="/posts">
                                        <Button
                                            variant="outline"
                                            className="mx-2 p-2 bg-gray-800 bg-opacity-90 hover:bg-gray-700 text-purple-300 border-purple-500"
                                        >
                                            Read my blog
                                        </Button>
                                    </Link>
                                    if there are people who still read blogs.
                                </p>
                            </CardContent>
                        </Card>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-4 text-purple-400 text-center sm:text-left">
                            Skills
                        </h2>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {skills.map((skill, index) => (
                                <SkillCard key={index} skill={skill} />
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-4 text-purple-400 text-center sm:text-left">
                            Socials
                        </h2>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                            {socials.map((social, index) => (
                                <Link
                                    key={index}
                                    target="_blank"
                                    href={social.href}
                                >
                                    <Button
                                        variant="outline"
                                        className="bg-gray-800 bg-opacity-90 hover:bg-gray-700 text-purple-300 border-purple-500"
                                    >
                                        {social.title}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-4 text-purple-400 text-center sm:text-left">
                            Projects
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {projects.map((project, index) => (
                                <ProjectCard key={index} project={project} />
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

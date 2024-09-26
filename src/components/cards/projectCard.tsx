import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export interface Project {
    title: string;
    description: string;
    backgroundUrl: string;
    coAuthors?: Array<{ name: string; url: string }>;
    github?: string;
    website?: string;
}

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <Card
            key={project.title}
            className="bg-gray-800 bg-opacity-90 border-purple-500 border-2 overflow-hidden transition-all duration-300 hover:border-purple-400"
        >
            <div className="relative h-48">
                <Image
                    src={project.backgroundUrl}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-end p-4">
                    <CardTitle className="text-2xl text-purple-300">
                        {project.title}
                    </CardTitle>
                </div>
            </div>
            <CardContent>
                <CardDescription className="text-gray-300 mt-2">
                    {project.description}
                </CardDescription>
                {project.coAuthors && project.coAuthors.length > 0 && (
                    <div className="mt-2 text-sm text-gray-300">
                        Co-authors:{" "}
                        {project.coAuthors.map((author, index) => (
                            <span key={author.url}>
                                {index > 0 && ", "}
                                <Link
                                    href={author.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-400 hover:text-purple-300"
                                >
                                    {author.name}
                                </Link>
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-4 space-x-2">
                    {project.github && (
                        <Button
                            size="sm"
                            variant="secondary"
                            className="bg-gray-700 hover:bg-gray-600 text-purple-200 border border-purple-400"
                        >
                            <Link href={project.github} target="_blank">
                                GitHub
                            </Link>
                        </Button>
                    )}

                    {project.website && (
                        <Button
                            size="sm"
                            variant="secondary"
                            className="bg-gray-700 hover:bg-gray-600 text-purple-200 border border-purple-400"
                        >
                            <Link href={project.website} target="_blank">
                                Website
                            </Link>
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

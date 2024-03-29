import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "@/app/globals.css";
import { Github } from "@/types";
import { centerItems } from "@/app/constants";

export default function Project() {
    const [data, setData] = useState<Github | null>(null);
    const [readme, setReadme] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://api.github.com/repos/YoruNoKen/HanamiBot")
            .then((response) => response.json() as Promise<Github>)
            .then((data) => setData(data))
            .catch((error) => console.error("Error fetching repository data:", error));

        fetch("https://raw.githubusercontent.com/YoruNoKen/HanamiBot/main/README.md")
            .then((response) => response.text() as Promise<string>)
            .then((data) => setReadme(data))
            .catch((error) => console.error("Error fetching repository data:", error));
    }, []);

    return (
        <main className={centerItems + "font-mono text-lg antialiased text-center"}>
            <h1 className="text-4xl font-bold mb-4">{data?.name}</h1>
            <p className="mb-4">{data?.description}</p>
            <div className="border border-gray-300 p-12">
                {readme && (
                    <div className="markdown-body">
                        <ReactMarkdown>{readme}</ReactMarkdown>
                    </div>
                )}
            </div>
        </main>
    );
}

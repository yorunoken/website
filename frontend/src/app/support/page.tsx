"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Copy, ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Support() {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const donationMethods = [
        {
            name: "Patreon",
            value: "patreon.com/yorunoken",
            href: "https://www.patreon.com/yorunoken/",
        },
        {
            name: "Ko-Fi",
            value: "ko-fi.com/yorunoken",
            href: "https://ko-fi.com/yorunoken",
        },
        {
            name: "Monero",
            value: "4AtrMPNkZMiVoxjbhhuxRyXHCFAviEJY4euLe8fqgypL5rr1Ns6FQoT8dXbq7Nj8XJjY1nTokJkvmjG7zts1xN8QQexPAw1",
        },
        {
            name: "IBAN",
            value: "TR56 0082 9000 0949 2143 7041 88",
        },
    ];

    function copyToClipboard(text: string, field: string) {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    }

    const background = "https://yorunoken.s-ul.eu/WWCbv3BD";

    return (
        <div className="relative min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-8">
            <div className="absolute inset-0 pointer-events-none opacity-5 blur-sm">
                <Image
                    src={background}
                    alt="Floral Background"
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>

            <div className="max-w-4xl mx-auto z-99 relative">
                <nav className="mb-8">
                    <Link href="/" passHref>
                        <Button
                            variant="outline"
                            className="bg-gray-800 hover:bg-gray-700 text-purple-300 border-purple-500"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Main Site
                        </Button>
                    </Link>
                </nav>

                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-center mb-4 text-purple-300">
                        Support Me
                    </h1>
                    <p className="text-center text-xl text-gray-400">
                        Your support helps me continue creating and maintaining
                        projects. Thank you for your generosity!
                    </p>
                </header>

                <main className="space-y-8">
                    {donationMethods.map((method) => (
                        <Card
                            key={method.name}
                            className="bg-gray-800 bg-opacity-90 border-purple-500 border-2"
                        >
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-purple-400">
                                    {method.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    {method.href ? (
                                        <div className="flex items-center">
                                            <Link
                                                href={method.href}
                                                className="text-lg font-mono break-all hover:underline flex items-center"
                                                target="_blank"
                                            >
                                                {method.value}
                                                <ExternalLink className="h-3 w-3 ml-1 mb-3 inline-flex" />
                                            </Link>
                                        </div>
                                    ) : (
                                        <p className="text-lg font-mono break-all">
                                            {method.value}
                                        </p>
                                    )}

                                    <Button
                                        variant="outline"
                                        className="ml-4 bg-gray-700 hover:bg-gray-600 text-purple-300 border-purple-500"
                                        onClick={() => {
                                            if (method.href) {
                                                window.open(
                                                    method.href,
                                                    "_blank",
                                                );
                                            } else {
                                                copyToClipboard(
                                                    method.value,
                                                    method.name,
                                                );
                                            }
                                        }}
                                    >
                                        {method.href ? (
                                            <ExternalLink className="h-4 w-4" />
                                        ) : copiedField === method.name ? (
                                            <Check className="h-4 w-4" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </main>

                <footer className="mt-8 text-center text-gray-400">
                    <p>
                        Thank you for considering supporting my work! (˵ •̀ ᴗ •́ ˵
                        ) ✧
                    </p>
                </footer>
            </div>
        </div>
    );
}

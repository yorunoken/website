import { Footer } from "@/components/footer";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Yoru portfolio",
    description: "Very cute",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    disableTransitionOnChange
                >
                    <main className="flex-grow mx-auto w-full">{children}</main>
                    <Footer />
                </ThemeProvider>
                <Script
                    src="https://cloud.umami.is/script.js"
                    data-website-id="76d0692e-1bef-4dcb-9b51-78f87d803f34"
                    strategy="afterInteractive"
                />
            </body>
        </html>
    );
}

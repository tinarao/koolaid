import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin", "cyrillic"]
})

export const metadata: Metadata = {
    title: "kool aid",
    description: "лайвкодинг просто",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body
                className={`${inter.className} dark antialiased`}
            >
                {children}
            </body>
        </html>
    );
}

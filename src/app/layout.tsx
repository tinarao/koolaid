import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

const inter = Inter({
    subsets: ["latin", "cyrillic"],
    weight: [
        "300",
        "500",
        "600",
        "700",
        "800",
        "900"
    ]
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
                <Toaster />
            </body>
        </html>
    );
}

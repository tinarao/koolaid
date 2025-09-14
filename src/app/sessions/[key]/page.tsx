"use client"

import { CodeEditor } from "@/components/editor/editor";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/sessions/use-session";
import { cn } from "@/lib/utils";
import { CopyIcon, PlayIcon, SaveIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProjectPage() {
    const { key }: { key: string } = useParams()
    const session = useSession()
    const router = useRouter()
    const [code, setCode] = useState("")

    useEffect(() => {
        session.start(key, {
            onStart() {
                toast.success("Соединение установлено!")
            },
            onError(error) {
                toast.error(error)
                if (error === "Сессия не найдена") {
                    session.stop()
                    router.replace("/")
                }
            },
            onBroadcast(pCode) {
                setCode(pCode)
                console.log("pCode:", pCode)
            },
        })

        return () => session.stop()
    }, [])

    function handleCodeChange(pCode?: string) {
        if (pCode) {
            session.sendMessage(pCode)
        }
    }

    async function handleCopyKey() {
        try {
            await navigator.clipboard.writeText(key)
            toast.success("Ключ сессии скопирован!")
        } catch (e) {
            console.log(e)
            toast.error("Не удалось скопировать ключ сессии")
        }
    }

    return (
        <div className="flex flex-col h-screen ">
            <header className="flex items-center justify-between px-8 py-4">
                <div className="space-x-2">
                    <Button size="icon" className="size-8" disabled>
                        <PlayIcon />
                    </Button>
                </div>
                <div className="flex items-center gap-x-4">
                    <div
                        className={cn("size-4 animate-pulse rounded-full", session.isConnected ? "bg-green-500" : "bg-red-500")}
                        title={session.isConnected ? "Соединение установлено" : "Соединение не установлено"}
                    />
                    <Button variant="secondary" title="Нажмите, чтобы скопировать ключ сессии" onClick={handleCopyKey}>
                        <CopyIcon />
                        {key}
                    </Button>
                </div>
            </header>
            <div className="grid grid-cols-2 flex-1 gap-x-4 px-8 pb-8">
                <div className="h-full">
                    <CodeEditor code={code} onChange={handleCodeChange} />
                </div>
                <div>
                    TODO piston
                </div>
            </div>
        </div>
    );
}

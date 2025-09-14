"use client"

import { CodeEditor } from "@/components/editor/editor";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/sessions/use-session";
import { cn } from "@/lib/utils";
import { PlayIcon, SaveIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectPage() {
    const { key }: { key: string } = useParams()
    const session = useSession()
    const [code, setCode] = useState("")

    useEffect(() => {
        session.start(key, {
            onStart() {
                console.log("Started")
            },
            onError() {
                console.log("error")
            },
            onBroadcast(pCode) {
                setCode(pCode)
                console.log("pCode:", pCode)
            },
        })

        return () => session.stop()
    }, [])

    function handleCodeChange(pCode?: string) {
        // setCode(pCode)
        if (pCode) {
            session.sendMessage(pCode)
        }
    }

    return (
        <div className="flex flex-col h-screen ">
            <header className="flex items-center justify-between px-8 py-4">
                {code}
                <div className="space-x-2">
                    <Button size="icon" className="size-8" disabled>
                        <PlayIcon />
                    </Button>
                    <Button size="icon" className="size-8" variant="secondary" disabled>
                        <SaveIcon />
                    </Button>
                </div>
                <div className="flex items-center gap-x-2">
                    <div
                        className={cn("size-4 animate-pulse rounded-full", session.isConnected ? "bg-green-500" : "bg-red-500")}
                        title={session.isConnected ? "Соединение установлено" : "Соединение не установлено"}
                    />

                    <span title="Ключ сессии">
                        {key}
                    </span>
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

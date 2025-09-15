"use client"

import { CodeExecutionResult } from "@/components/editor/code-execution-result";
import { CodeEditor } from "@/components/editor/editor";
import { RuntimeSelect } from "@/components/selects/runtime-select";
import { Button } from "@/components/ui/button";
import { execute } from "@/lib/piston/actions";
import { ExecutionResult, Language } from "@/lib/piston/piston";
import { useSession } from "@/lib/sessions/use-session";
import { cn } from "@/lib/utils";
import { CopyIcon, LoaderCircleIcon, PlayIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export default function ProjectPage() {
    const [code, setCode] = useState("")
    const [language, setLanguage] = useState<Language | null>(null)
    const [codeExecutionResult, setCodeExecutionResult] = useState<ExecutionResult | null>(null)
    const [pending, startTransition] = useTransition()
    const { key }: { key: string } = useParams()
    const session = useSession()
    const router = useRouter()

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
            },
        })

        return () => session.stop()
    }, [])

    function handleCodeChange(pCode?: string) {
        if (!pCode) return;
        session.sendMessage(pCode)
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

    async function handleRunCode() {
        if (!language) {
            toast.error("Язык не выбран!")
            return
        }

        startTransition(async () => {
            const result = await execute(code, language)
            setCodeExecutionResult(result)
        })
    }

    return (
        <div className="flex flex-col h-screen">
            <header className="flex items-center justify-between px-8 py-4">
                <div className="flex items-center gap-x-2">
                    <Button size="icon" onClick={handleRunCode} disabled={pending || !language}>
                        {pending ? <LoaderCircleIcon className="animate-spin" /> : <PlayIcon />}
                    </Button>
                    <RuntimeSelect onSelect={setLanguage} disabled={pending} />
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
            <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 gap-x-4 px-8 pb-8">
                <div className="h-full">
                    <CodeEditor code={code} onChange={handleCodeChange} language={language} />
                </div>
                <div>
                    <CodeExecutionResult loading={pending} result={codeExecutionResult} />
                </div>
            </div>
        </div>
    );
}

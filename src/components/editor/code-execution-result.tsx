import { ExecutionResult } from "@/lib/piston/piston"
import { cn } from "@/lib/utils"
import { LoaderCircleIcon } from "lucide-react"
import { Cascadia_Mono } from "next/font/google"

const cascadia = Cascadia_Mono({
    subsets: ["latin"],
})

type CodeExecutionResultProps = {
    result: ExecutionResult | null
    loading?: boolean
}

export function CodeExecutionResult({ result, loading = false }: CodeExecutionResultProps) {
    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <LoaderCircleIcon className="animate-spin" />
            </div>
        )
    }

    if (!result) {
        return (
            <div>
                Выполните код, чтобы увидеть результат
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full space-y-2">
            <div className="space-y-2">
                <h3 className="space-x-2">
                    <span className="text-2xl font-medium">
                        {result.language}
                    </span>
                    <span className="text-muted-foreground">
                        {result.version}
                    </span>
                </h3>

                <div>
                    <ul>
                        <li>
                            code: {result.run.code}
                        </li>
                        <li>
                            signal: {result.run.signal || "none"}
                        </li>
                    </ul>
                </div>
            </div>

            <p className={cn("flex-1 py-4 px-2 bg-secondary font-mono rounded-md overflow-auto break-words whitespace-pre-wrap", cascadia.className)}>
                {result.run.output}
            </p>
        </div>
    )
}

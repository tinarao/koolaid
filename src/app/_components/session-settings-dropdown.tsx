"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteSession } from "@/lib/sessions"
import { TrashIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { PropsWithChildren, useTransition } from "react"
import { toast } from "sonner"

type SessionSettingsDropdownProps = {
    sessionKey: string
}

export function SessionSettingsDropdown({ sessionKey, children }: PropsWithChildren<SessionSettingsDropdownProps>) {
    const router = useRouter()
    const [pending, startTransition] = useTransition()

    async function handleDeleteSession() {
        startTransition(async () => {
            const result = await deleteSession(sessionKey)
            if (!result.ok) {
                toast.error(result.error || "Не удалось удалить сессию")
                return
            }

            toast.success("Сессия удалена!")

            // move to onSessionDeleted?
            // unnesessary sideeffect
            router.replace("/")
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger disabled={pending} asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Настройки сессии</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled={pending} onClick={handleDeleteSession} variant="destructive">
                    <TrashIcon /> Закрыть сессию
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

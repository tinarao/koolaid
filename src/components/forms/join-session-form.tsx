"use client"

import { SearchIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useRef, useTransition } from "react"
import { toast } from "sonner"
import { isSessionExists } from "@/lib/sessions"
import { useRouter } from "next/navigation"

export function JoinSessionForm({ className = "" }: { className?: string }) {
    const router = useRouter()
    const [pending, startTransition] = useTransition()
    const keyInputRef = useRef<HTMLInputElement | null>(null)

    async function handleSubmit() {
        if (!keyInputRef.current) return
        const key = keyInputRef.current.value

        if (!key) {
            toast.error("Ключ не может быть пустым")
            return
        }

        startTransition(async () => {
            if (await isSessionExists(key)) {
                router.push("/sessions/" + key)
                return
            }

            toast.error("Сессия с таким ключом не существует")
        })
    }

    return (
        <div className={className}>
            <Input disabled={pending} ref={keyInputRef} />
            <Button disabled={pending} onClick={handleSubmit}>
                <SearchIcon /> Присоединиться
            </Button>
        </div>
    )
}

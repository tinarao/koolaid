"use client"

import { PlusIcon } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { createSession } from "@/lib/sessions"
import { useTransition } from "react"

export function CreateSessionForm() {
    const [pending, startTransition] = useTransition()
    const router = useRouter()

    async function handleSubmit() {
        startTransition(async () => {
            const result = await createSession()
            if (result.ok) {
                router.push("/sessions/" + result.key)
            }
        })
    }
    return (
        <Button className="w-full" size="lg" disabled={pending} onClick={handleSubmit}>
            <PlusIcon /> Создать сессию
        </Button>
    )
}

import { PlusIcon } from "lucide-react"
import { Button } from "../ui/button"
import { redirect } from "next/navigation"
import { createSession } from "@/lib/sessions/actions"

export function CreateSessionForm() {
    return (
        <form action={async () => {
            "use server"
            const result = await createSession()
            if (result.ok) {
                redirect("/sessions/" + result.key)
            }
        }}>
            <Button className="w-full" size="lg">
                <PlusIcon /> Создать сессию
            </Button>
        </form>
    )
}

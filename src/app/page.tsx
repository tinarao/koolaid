import { Button } from "@/components/ui/button";
import { createSession } from "@/lib/sessions/actions";
import { PlusIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default function Home() {
    return <div className="flex flex-col h-screen items-center justify-center">
        <form action={async () => {
            "use server"

            const result = await createSession()
            console.log(result)
            if (result.ok) {
                redirect("/sessions/" + result.key)
            }
        }}>
            <Button>
                <PlusIcon /> Создать сессию
            </Button>
        </form>
    </div>
}

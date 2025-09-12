import { CodeEditor } from "@/components/editor/editor";
import { Button } from "@/components/ui/button";
import { PlayIcon, SaveIcon } from "lucide-react";

// проекты храним в локальном хранилище
// нужно над синхронизацией прям подумать

export default function Home() {
    return (
        <div className="flex flex-col h-screen ">
            <header className="px-8 py-4">
                <div className="space-x-2">
                    <Button size="icon" className="size-8" disabled>
                        <PlayIcon />
                    </Button>
                    <Button size="icon" className="size-8" variant="secondary" disabled>
                        <SaveIcon />
                    </Button>
                </div>
            </header>
            <div className="grid grid-cols-2 flex-1 gap-x-4 px-8 pb-8">
                <div className="h-full">
                    <CodeEditor />
                </div>
                <div>
                    TODO piston
                </div>
            </div>
        </div>
    );
}

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { Language } from "@/lib/piston/piston"
import { useState } from "react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { LANGUAGES } from "@/lib/piston/constants"

type RuntimeSelectProps = {
    onSelect?: (lang: Language) => void
}

export function RuntimeSelect({ onSelect }: RuntimeSelectProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? LANGUAGES.find((lang) => lang === value)
                        : "Выбрать язык"}
                    <ChevronsUpDownIcon className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Выбрать язык" className="h-9" />
                    <CommandList>
                        <CommandEmpty>Язык не найден</CommandEmpty>
                        <CommandGroup>
                            {LANGUAGES.map((lang) => (
                                <CommandItem
                                    key={lang}
                                    value={lang}
                                    onSelect={(currentValue) => {
                                        onSelect?.(lang)
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {lang}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto",
                                            value === lang ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

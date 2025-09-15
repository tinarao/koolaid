"use client"

import Editor from '@monaco-editor/react'
import { useRef } from "react"
import * as monaco from "monaco-editor"
import { Language } from '@/lib/piston/piston'

type CodeEditorProps = {
    code: string
    onChange: (msg?: string) => void
    language: Language | null
}

export function CodeEditor({ code, onChange, language }: CodeEditorProps) {
    const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

    return (
        <Editor
            className="h-full"
            defaultLanguage={language ?? "typescript"}
            defaultValue=""
            value={code}
            onMount={(editor, _monaco) => { monacoRef.current = editor; }}
            onChange={(msg, _monaco) => onChange(msg)}
            theme='vs-dark'
        />
    )
}

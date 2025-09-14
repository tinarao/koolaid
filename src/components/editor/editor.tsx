"use client"

import Editor from '@monaco-editor/react'
import { useRef } from "react"
import * as monaco from "monaco-editor"

export function CodeEditor({ code, onChange }: { code: string, onChange: (msg?: string) => void }) {
    const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

    return (
        <Editor
            className="h-full"
            defaultLanguage="typescript"
            defaultValue=""
            value={code}
            onMount={(editor, _monaco) => { monacoRef.current = editor; }}
            onChange={(msg, _monaco) => onChange(msg)}
            theme='vs-dark'
        />
    )
}

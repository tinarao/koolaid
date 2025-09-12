"use client"

import Editor from '@monaco-editor/react'
import { useRef } from "react"
import * as monaco from "monaco-editor"

export function CodeEditor() {
    const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
    function save(data: any) { console.log(data) }

    return (
        <Editor
            className="h-full"
            defaultLanguage="typescript"
            defaultValue="# Elixir starter"
            onMount={(editor, monaco) => { monacoRef.current = editor; }}
            onChange={e => console.log(e)}
            theme='vs-dark'
        />
    )
}

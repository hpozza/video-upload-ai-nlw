import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { api } from '@/lib/axios';

interface Prompt {
    id: string
    title: string
    template: string
}

interface PromptSelectedProps {
    onPromptSelected: (template: string) => void
}

export function PromptSelect(props: PromptSelectedProps) {
    const [prompts, setPrompts] = useState<Prompt[] | null>(null);

    useEffect(() => {
        api.get("/prompts").then(res => {
            setPrompts(res.data)
        })
    }, [])

    function handlePromptSelected(promptId: string) {
        const selectedPrompt = prompts?.find(d => d.id === promptId)

        if (!selectedPrompt) {
            return
        }

        props.onPromptSelected(selectedPrompt.template);
    }

    return (
        <Select onValueChange={handlePromptSelected}>
            <SelectTrigger>
                <SelectValue placeholder='Select one prompt' />
            </SelectTrigger>
            <SelectContent>
                {prompts?.map(prompt => {
                    return (
                        <SelectItem key={prompt.id} value={prompt.id}>{prompt.title}</SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )
}

'use client';

import { useState } from 'react';

export default function CopyButton({ text }: { text: string }) {
    const [label, setLabel] = useState('Copy');
    async function copy() {
        try {
            await navigator.clipboard.writeText(text);
            setLabel('Copied');
            setTimeout(() => setLabel('Copy'), 1500);
        } catch {
            setLabel('Select it');
        }
    }
    return (
        <button type='button' onClick={copy} className='cursor-pointer rounded-full bg-(--c) px-7.5 py-2.25 font-bold text-[#14100a]'>
            {label}
        </button>
    );
}

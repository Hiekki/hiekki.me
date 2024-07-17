'use client';

import { useEffect, useState } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';

export default function ThemeToggle() {
    // let theme = false;
    // if (typeof window !== 'undefined') theme = localStorage?.getItem('theme') === 'dark';
    const [darkMode, setDarkMode] = useState(typeof window !== 'undefined' ? localStorage?.getItem('theme') === 'dark' : false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <>
            <div
                className='relative flex h-8 w-16 cursor-pointer items-center rounded-full bg-zinc-300 p-1 shadow-lg dark:bg-zinc-700'
                onClick={() => setDarkMode(!darkMode)}
            >
                <LuMoon className='h-6 w-6 text-black' size={18} />
                <div
                    className={`absolute h-6 w-6 rounded-full bg-yellow-500 shadow-md duration-300 dark:bg-black ${
                        darkMode ? 'ml-0' : 'ml-8'
                    }`}
                />
                <LuSun className='ml-auto h-6 w-6 text-yellow-500' size={18} />
            </div>
        </>
    );
}

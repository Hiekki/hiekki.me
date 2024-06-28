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
                className="relative w-16 h-8 flex items-center bg-zinc-300 dark:bg-zinc-700 rounded-full cursor-pointer p-1 shadow-lg"
                onClick={() => setDarkMode(!darkMode)}
            >
                <LuMoon className="w-6 h-6 text-black" size={18} />
                <div
                    className={`absolute bg-yellow-500 dark:bg-black w-6 h-6 rounded-full shadow-md duration-300 ${
                        darkMode ? 'ml-0' : 'ml-8'
                    }`}
                />
                <LuSun className="ml-auto w-6 h-6 text-yellow-500" size={18} />
            </div>
        </>
    );
}

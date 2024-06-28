'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CiMenuFries } from 'react-icons/ci';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const MobileNavbar = ({ links }: { links: { name: string; path: string; icon: React.ReactNode }[] }) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Sheet open={isOpen}>
            <SheetTrigger className="flex justify-center items-center">
                <CiMenuFries
                    className="text-[32px] cursor-pointer hover:text-purple-600 hover:dark:text-purple-400 transition-all"
                    onClick={() => setIsOpen(!isOpen)}
                />
            </SheetTrigger>
            <SheetContent className="flex flex-col" onBackgroundClick={() => setIsOpen(!isOpen)}>
                <span className="left-5 top-5 container absolute">
                    <ThemeToggle />
                </span>
                <ul className="flex flex-1 list-none flex-col items-center justify-center gap-6">
                    {links.map((link, index) => (
                        <Link
                            href={link.path}
                            key={index}
                            className={`${
                                link.path === pathname && 'text-purple-500 border-b-2 border-purple-500 font-bold'
                            } flex items-center justify-center text-2xl hover:text-purple-600 dark:hover:text-purple-400 transition-all capitalize`}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <div>{link.icon}</div>
                            <div className="ml-2">{link.name}</div>
                        </Link>
                    ))}
                </ul>
            </SheetContent>
        </Sheet>
    );
};

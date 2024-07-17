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
            <SheetTrigger className='flex items-center justify-center'>
                <CiMenuFries
                    className='cursor-pointer text-[32px] transition-all hover:text-purple-600 hover:dark:text-purple-400'
                    onClick={() => setIsOpen(!isOpen)}
                />
            </SheetTrigger>
            <SheetContent className='flex flex-col' onBackgroundClick={() => setIsOpen(!isOpen)}>
                <span className='container absolute left-5 top-5'>
                    <ThemeToggle />
                </span>
                <ul className='flex flex-1 list-none flex-col items-center justify-center gap-6'>
                    {links.map((link, index) => (
                        <Link
                            href={link.path}
                            key={index}
                            className={`${
                                link.path === pathname && 'border-b-2 border-purple-500 font-bold text-purple-500'
                            } flex items-center justify-center text-2xl capitalize transition-all hover:text-purple-600 dark:hover:text-purple-400`}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <div>{link.icon}</div>
                            <div className='ml-2'>{link.name}</div>
                        </Link>
                    ))}
                </ul>
            </SheetContent>
        </Sheet>
    );
};

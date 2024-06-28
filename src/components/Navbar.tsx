'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

//Components
import { FlipWords } from './ui/flip-words';
import ThemeToggle from './ThemeToggle';
import { MobileNavbar } from './MobileNavbar';

const links = [
    { name: 'home', path: '/' },
    { name: 'resume', path: '/resume' },
    { name: 'work', path: '/work' },
    { name: 'contact', path: '/contact' },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="sticky shadow-md top-0 z-50 w-full h-20 dark:bg-zinc-900 bg-zinc-100 dark:text-white text-black">
            <div className="flex w-full items-center justify-between py-6 container mx-auto">
                <div className="text-2xl font-bold">
                    <FlipWords words={['Hiekki', 'Kevin Abernathy']} className="text-2xl font-bold" />
                </div>
                <div className="hidden xl:flex items-center">
                    <span className="flex gap-8">
                        {links.map((link, index) => {
                            return (
                                <Link
                                    href={link.path}
                                    key={index}
                                    className={`${
                                        link.path === pathname && 'text-purple-500 border-b-2 border-purple-500'
                                    } font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-all capitalize`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </span>
                    <span className="ml-8">
                        <ThemeToggle />
                    </span>
                </div>
                <div className="flex items-center xl:hidden">
                    <MobileNavbar links={links} />
                </div>
            </div>
        </nav>
    );
}

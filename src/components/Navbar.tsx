'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IoHomeOutline, IoPersonOutline, IoCodeWorkingOutline, IoDocumentTextOutline } from 'react-icons/io5';

import { FlipWords } from './ui/flip-words';
import ThemeToggle from './ThemeToggle';
import { MobileNavbar } from './MobileNavbar';

const links = [
    { name: 'home', path: '/', icon: <IoHomeOutline /> },
    { name: 'resume', path: '/resume', icon: <IoDocumentTextOutline /> },
    { name: 'projects', path: '/projects', icon: <IoCodeWorkingOutline /> },
    { name: 'contact', path: '/contact', icon: <IoPersonOutline /> },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className='sticky top-0 z-50 h-20 w-full bg-zinc-100 text-black shadow-md dark:bg-zinc-900 dark:text-white'>
            <div className='container mx-auto flex w-full items-center justify-between py-6'>
                <div className='text-2xl font-bold'>
                    <FlipWords words={['Hiekki', 'Kevin Abernathy']} className='text-2xl font-bold' />
                </div>
                <div className='hidden items-center xl:flex'>
                    <span className='flex gap-8'>
                        {links.map((link, index) => {
                            return (
                                <Link
                                    href={link.path}
                                    key={index}
                                    className={`${
                                        link.path === pathname && 'border-b-2 border-purple-500 font-bold text-purple-500'
                                    } flex items-center justify-center capitalize transition-all hover:text-purple-600 dark:hover:text-purple-400`}
                                >
                                    <div>{link.icon}</div>
                                    <div className='ml-2'>{link.name}</div>
                                </Link>
                            );
                        })}
                    </span>
                    <span className='ml-8'>
                        <ThemeToggle />
                    </span>
                </div>
                <div className='flex items-center xl:hidden'>
                    <MobileNavbar links={links} />
                </div>
            </div>
        </nav>
    );
}

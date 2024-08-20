'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { FaCheckCircle } from 'react-icons/fa';

const Thanks = () => {
    const [countdown, setCountdown] = useState<number>(10);
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push('/');
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <div className='container mx-auto'>
            <div className='flex flex-col items-center justify-center gap-4 pt-12'>
                <div className='rounded-md bg-zinc-300 p-10 dark:bg-zinc-700'>
                    <div className='text-black/60 dark:text-white/60'>
                        <div className='flex items-center justify-center gap-4 text-purple-500'>
                            <FaCheckCircle className='h-20 w-20' />
                        </div>
                        <p className='mt-12 text-center text-2xl text-black dark:text-white'>
                            <span className='text-purple-500'>Thanks</span> for reaching out!
                        </p>
                        <p className='mt-6 text-center text-xl'>I'll get back to you as soon as possible.</p>
                        <p className='mt-6 text-center text-[12px]'>{`Redirecting in ${countdown} seconds...`}</p>
                        <p className='text-center text-[10px]'>
                            If you're not redirected, click{' '}
                            <a className='text-purple-500 hover:text-purple-600 hover:dark:text-purple-400' href='/'>
                                here
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Thanks;

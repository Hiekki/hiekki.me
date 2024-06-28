import React from 'react';
import './globals.css';
import { Space_Mono, Raleway } from 'next/font/google';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import StairTransition from '@/components/StairTransition';

const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-spaceMono' });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${spaceMono.variable}`}>
                <Navbar />
                <StairTransition />
                <PageTransition>{children}</PageTransition>
            </body>
        </html>
    );
}

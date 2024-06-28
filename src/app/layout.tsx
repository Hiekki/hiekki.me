import React from 'react';
import './globals.css';
import { Space_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import StairTransition from '@/components/StairTransition';
import { Metadata, Viewport } from 'next';
import { AboutMe } from '@/utils/constants';

const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-spaceMono' });

export const metadata: Metadata = {
    title: 'Hiekki | Portfolio',
    description: AboutMe.description,
    openGraph: {
        title: 'Hiekki | Portfolio',
        description: AboutMe.description,
        images: ['https://hiekki.me/assets/hiekki-portfolio-transparent.svg'],
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#a855f7' },
        { media: '(prefers-color-scheme: dark)', color: '#a855f7' },
    ],
};

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

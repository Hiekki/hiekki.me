import React from 'react';
import './globals.css';
import { Space_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import StairTransition from '@/components/StairTransition';
import { Metadata, Viewport } from 'next';
import { AboutMe } from '@/utils/constants';
import { ThemeProvider } from '@/components/theme-provider';

const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-spaceMono' });

export const metadata: Metadata = {
    metadataBase: new URL('https://hiekki.me'),
    title: 'Hiekki | Portfolio',
    description: AboutMe.description,
    keywords: ['hiekki', 'kevin', 'abernathy', 'kevin abernathy', 'software developer', 'nextjs', 'tailwindcss', 'typescript'],
    authors: [{ name: 'Hiekki', url: 'https://hiekki.me' }],
    twitter: {
        images: '/assets/metadataPhoto.png',
        card: 'summary',
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
        <html lang='en'>
            <body className={`${spaceMono.variable}`}>
                <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                    <Navbar />
                    <StairTransition />
                    <PageTransition>{children}</PageTransition>
                </ThemeProvider>
            </body>
        </html>
    );
}

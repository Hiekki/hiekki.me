import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import { site } from '@/lib/data';
import './globals.css';

// Archivo has a width axis, which gives the headings their slightly wide look.
const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jb', display: 'swap' });

const name = site.nameLines.join(' ');

export const metadata: Metadata = {
    // Set NEXT_PUBLIC_SITE_URL to your real address (for example https://yourname.com) so link previews work.
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://hiekki.me'),
    title: `${name} | Portfolio`,
    description: site.tagline,
    openGraph: { title: name, description: site.tagline, type: 'website', siteName: name },
    twitter: { card: 'summary_large_image', title: name, description: site.tagline },
};

export const viewport: Viewport = { themeColor: '#07090d', viewportFit: 'cover' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' className={`${archivo.variable} ${mono.variable}`}>
            <body>{children}</body>
        </html>
    );
}

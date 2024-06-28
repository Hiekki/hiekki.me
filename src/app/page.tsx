import Link from 'next/link';
import { BsChatLeftText } from 'react-icons/bs';

import Photo from '@/components/Photo';
import { Button } from '@/components/ui/button';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import Stats from '@/components/Stats';
import { AboutMe } from '@/utils/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
    twitter: {
        title: 'Hiekki | Portfolio',
        description: AboutMe.description,
        site: 'https://hiekki.me',
        images: 'https://hiekki.me/assets/hiekki-portfolio-transparent.svg',
        card: 'summary_large_image',
    },
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#a855f7' },
        { media: '(prefers-color-scheme: dark)', color: '#a855f7' },
    ],
};

export default function Home() {
    return (
        <section className="h-full">
            <div className="container mx-auto h-full">
                <div className="flex flex-col xl:flex-row justify-between items-center xl:pt-8 xl:pb-24">
                    <div className="text-center xl:text-left order-2 xl:order-none">
                        <span className="text-xl">Software Developer</span>
                        <h1 className="h1 mb-6">
                            Hello, I'm <br />
                            <span className="text-purple-500">Kevin Abernathy</span>
                        </h1>
                        <p className="max-w-[500px] mb-9 text-black/80 dark:text-white/80">{AboutMe.description}</p>
                        <div className="flex flex-col xl:flex-row items-center justify-center">
                            <Button variant="outline" size="lg" className="uppercase flex items-center gap-2 mb-8 xl:mb-0">
                                <Link href={'/contact'}>Contact</Link>
                                <BsChatLeftText className="text-xl" />
                            </Button>
                            <div className="flex items-center justify-center w-full gap-2 mb-8 xl:mb-0">
                                <AnimatedTooltip />
                            </div>
                        </div>
                    </div>
                    <div className="order-1 xl:order-none mt-10 xl:mt-0 mb-8 xl:mb-0">
                        <Photo />
                    </div>
                </div>
                <Stats />
            </div>
        </section>
    );
}

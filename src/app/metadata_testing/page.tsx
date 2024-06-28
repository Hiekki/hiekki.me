import { AboutMe } from '@/utils/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hiekki | Metadata Testing',
    description: 'Doing a test or so. ' + AboutMe.description,
    twitter: {
        title: 'Hiekki | Metadata Testing',
        description: 'Doing a test or so. ' + AboutMe.description,
        site: 'https://hiekki.me',
        images: 'https://hiekki.me/assets/hiekki-portfolio-transparent.svg',
        card: 'summary_large_image',
    },
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#a855f7' },
        { media: '(prefers-color-scheme: dark)', color: '#a855f7' },
    ],
};

const page = () => {
    return <div>yeah</div>;
};

export default page;

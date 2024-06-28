import ResumeInfo from '@/components/ResumeInfo';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hiekki | Resume',
    description: 'Testing new descriptions with different pages.',
    openGraph: {
        title: 'Hiekki | Resume',
        description: 'Testing new descriptions with different pages.',
    },
};

const Resume = () => {
    return <ResumeInfo />;
};

export default Resume;

import { Metadata } from 'next';

import ContactInfo from '@/components/ContactInfo';

export const metadata: Metadata = {
    title: 'Hiekki | Contact',
};

const Contact = () => {
    return <ContactInfo />;
};

export default Contact;

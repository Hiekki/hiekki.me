import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import type { LegalSection } from '@/components/LegalPage';
import { legal } from '@/lib/legal';

export const metadata: Metadata = { title: `Terms of Service | ${legal.group}` };

const sections: LegalSection[] = [
    {
        heading: 'Accepting these terms',
        paras: [
            'By adding our bots to a server, using their commands or visiting our websites, you agree to these terms. If you do not agree, please do not use them.',
        ],
    },
    {
        heading: "Discord's rules also apply",
        paras: ["Our bots run on Discord. You must follow Discord's Terms of Service and Community Guidelines when you use them."],
    },
    {
        heading: 'Using the bots',
        list: [
            "Do not use the bots to harass anyone, break the law or break Discord's rules",
            'Do not try to exploit, overload, reverse engineer or attack the bots or their servers',
            'Server owners and admins are responsible for how the bots are used in their server',
        ],
    },
    {
        heading: 'Availability',
        paras: [
            'The bots are provided as is. We may change, pause or stop any feature at any time, and we do not promise they will always be online or free of errors.',
        ],
    },
    {
        heading: 'Your content',
        paras: [
            'You are responsible for what you send to the bots. Content must not be illegal, defamatory, threatening, infringing or harmful. You give us a non-exclusive, royalty-free permission to process it as needed to run the bots. We may remove content that breaks these terms.',
        ],
    },
    {
        heading: 'Ownership',
        paras: [
            `The bots, their code, and the content, images, text and logos on our websites belong to ${legal.group} or its creators. You may use them for personal use, but you may not copy, download or modify them without written permission.`,
        ],
    },
    {
        heading: 'Communications',
        paras: [
            'We communicate with you electronically, through Discord or by email. By using our services you agree to receive notices this way.',
        ],
    },
    {
        heading: 'Ending access',
        paras: ['We may block a user or server, or remove access to the bots, at our discretion, especially if these terms are broken.'],
    },
    {
        heading: 'Limit of liability',
        paras: [
            `To the fullest extent the law allows, ${legal.group} is not liable for any damages that come from using or being unable to use the bots or websites.`,
        ],
    },
    {
        heading: 'Privacy',
        paras: ['Our Privacy Policy, at /privacy, explains how we handle your information.'],
    },
    {
        heading: 'Governing law and disputes',
        paras: [
            'These terms are governed by the laws of the State of Arkansas. Any dispute is decided in the state or federal courts of Arkansas, which have exclusive jurisdiction.',
        ],
    },
    {
        heading: 'Changes to these terms',
        paras: ['We may update these terms from time to time. Changes will be posted on this page with a new date at the top.'],
    },
    {
        heading: 'Contact',
        paras: [`Questions about these terms can be sent to ${legal.contact}.`],
    },
];

export default function Tos() {
    return (
        <LegalPage
            title='Terms of Service'
            updated={legal.updated}
            intro={`These terms cover your use of ${legal.bots} and the websites run by ${legal.group}.`}
            sections={sections}
        />
    );
}

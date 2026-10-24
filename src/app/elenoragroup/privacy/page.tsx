import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import type { LegalSection } from '@/components/LegalPage';
import { legal } from '@/lib/legal';

export const metadata: Metadata = { title: `Privacy Policy | ${legal.group}` };

const sections: LegalSection[] = [
    {
        heading: 'Information we collect',
        paras: ['When you use our Discord bots, we may receive and store the following from Discord:'],
        list: [
            'Your Discord user ID and username',
            'The ID and name of servers and channels where the bots are used',
            'Messages and commands you send to the bots, only as needed to run the command',
            'Settings and data you create with the bots (for example preferences, roles or saved items)',
            '[Delete anything above your bots do not store, and add anything they do.]',
        ],
    },
    {
        heading: 'Log data',
        paras: [
            'Our websites and servers may automatically record standard technical data, such as IP address, browser type and version, pages visited, visit times and error details. This data can identify a person when combined with other information.',
        ],
    },
    {
        heading: 'How we use information',
        list: [
            'To run the bots and provide their features',
            'To keep the bots secure, fix problems and prevent abuse',
            'To answer messages you send us by email or social media',
        ],
        paras: ['We do not sell your personal information.'],
    },
    {
        heading: 'Sharing',
        paras: [
            `Information is stored with our hosting and database providers (${legal.host}) and handled through Discord's own platform. We only share it elsewhere if the law requires it or to protect our users and services.`,
        ],
    },
    {
        heading: 'Security',
        paras: [
            'We protect personal information using commercially acceptable means. No electronic transmission or storage is completely secure, so we cannot guarantee absolute security.',
        ],
    },
    {
        heading: 'How long we keep information',
        paras: [
            'We keep data only as long as we need it to run the bots, unless we must keep it for legal, accounting or reporting reasons. After that we delete or anonymize it. [Add a specific period if you have one, for example data is removed when a bot is removed from a server.]',
        ],
    },
    {
        heading: "Children's privacy",
        paras: [
            "Our bots and websites are not directed at children under 13, which is also Discord's minimum age. We do not knowingly collect personal information from anyone under 13. If you believe we have, contact us and we will delete it.",
        ],
    },
    {
        heading: 'International transfers',
        paras: [
            'Information may be stored or processed in places with different data protection laws than where you live. We handle it in line with applicable law and this policy.',
        ],
    },
    {
        heading: 'Your rights and choices',
        paras: [
            `You can ask what data we hold about you, ask us to correct it, or ask us to delete it. Email ${legal.contact} and we will respond. You can also stop all data collection by removing the bots from your server or blocking them. You may also have the right to complain to your local data protection authority.`,
        ],
    },
    {
        heading: 'Links to other sites',
        paras: ['We are not responsible for the privacy practices of other websites we link to.'],
    },
    {
        heading: 'Changes to this policy',
        paras: ['We may update this policy from time to time. Changes will be posted on this page with a new date at the top.'],
    },
    {
        heading: 'Contact',
        paras: [`Questions about this policy can be sent to ${legal.contact}.`],
    },
];

export default function Privacy() {
    return (
        <LegalPage
            title='Privacy Policy'
            updated={legal.updated}
            intro={`This policy explains what information ${legal.group} collects through ${legal.bots} and our websites, and how we use it.`}
            sections={sections}
        />
    );
}

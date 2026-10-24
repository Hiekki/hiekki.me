// All of the site's content lives here. Anything in [brackets] or 20XX is a placeholder.
// The scene has five built-in cluster shapes, so keep exactly five sections.

export const site = {
    // Two lines are used on tall phone screens; they are joined into one line on wide screens.
    nameLines: ['Kevin', 'Abernathy'] as [string, string],
    tagline: 'Parts salesman. Software developer.',
    email: 'hiekkii@gmail.com',
    phone: '901.319.0381',
    location: 'West Memphis, AR',
    summary:
        'Self-taught developer and parts sales professional. At AutoZone I was promoted twice in six months to commercial sales manager, served 30+ commercial accounts of my own, and helped grow a new commercial program from about $7K to about $18K in weekly sales. Now selling truck parts at TAG, a Freightliner company, and building websites and Discord bots with Node.js, MongoDB, MariaDB and SQL.',
    // The résumé button opens /resume, a print-ready page built from this file.
    // If you would rather offer your own PDF, put it in public/resume.pdf and set this to "/resume.pdf".
    resumeHref: '/resume',
};

export const skills: { label: string; items: string[] }[] = [
    { label: 'Software', items: ['Node.js', 'MongoDB', 'MariaDB', 'SQL', 'Next.js', 'Tailwind CSS'] },
    {
        label: 'Sales',
        items: [
            'Commercial account sales, parts knowledge and sourcing, quoting and pricing, customer relationships, team leadership and coaching, inventory management, negotiation, and more.',
        ],
    },
];

export type Section = {
    id: string;
    label: string; // shown under each cluster and in the dock
    heading: string;
    blurb: string;
    color: [number, number, number]; // cluster color (r, g, b)
};

export const sections: Section[] = [
    {
        id: 'work',
        label: 'Work history',
        heading: 'Work history',
        blurb: 'From the parts counter to the code editor and back.',
        color: [255, 185, 56],
    },
    {
        id: 'bots',
        label: 'Discord bots',
        heading: 'Discord bots',
        blurb: 'Node.js bots with real databases behind them.',
        color: [126, 224, 195],
    },
    {
        id: 'sites',
        label: 'Websites',
        heading: 'Websites',
        blurb: 'Sites built from scratch, plus the one you are on.',
        color: [255, 143, 107],
    },
    {
        id: 'data',
        label: 'Databases',
        heading: 'Databases',
        blurb: 'Where the parts, the users, and the data actually live.',
        color: [157, 180, 255],
    },
    {
        id: 'contact',
        label: 'Contact',
        heading: 'Need a part, or a website?',
        blurb: 'Either way, send me a note.',
        color: [242, 233, 208],
    },
];

export type Role = { title: string; dates: string; duration: string; note: string };

export type Job = {
    company: string;
    // Single-title jobs use title + description. Jobs with several titles use roles (newest first).
    title?: string;
    dates: string;
    where?: string;
    description?: string;
    badge?: string;
    roles?: Role[];
};

export const jobs: Job[] = [
    {
        company: 'TAG Truck Center',
        title: 'Parts Salesman',
        dates: 'Oct 2026 to Current',
        description: 'Coming soon..',
    },
    {
        company: 'AutoZone',
        dates: 'Apr 2025 to Current',
        where: 'about 18 months',
        badge: 'Promoted twice in 6 months',
        roles: [
            {
                title: 'Commercial Sales Manager',
                dates: 'Nov 2025 to Oct 2026',
                duration: 'about 11 months',
                note: 'Coming soon..',
            },
            {
                title: 'Parts Sales Manager',
                dates: 'May 2025 to Nov 2025',
                duration: 'about 6 months',
                note: 'Coming soon..',
            },
            {
                title: 'Sales Associate',
                dates: 'Apr 2025 to May 2025',
                duration: 'about 3 weeks',
                note: 'Coming soon..',
            },
        ],
    },
    {
        company: 'Team Hydra',
        title: 'Software Developer',
        dates: 'Jul 2023 to Dec 2024',
        description: 'Coming soon..',
    },
];

export type Item = { title: string; text: string; tags?: string[] };

export const bots: Item[] = [
    {
        title: 'Elenora',
        text: 'Elenora is a feature rich RuneScape Clan administration discord bot with a wide variety of commands. The creation of Elenora was to provide a reliable, dependable, & helpful tool that would service any sized community.',
        tags: ['Node.js', 'MongoDB', 'TypeScript', 'MariaDB'],
    },
    {
        title: 'Cora',
        text: 'Cora is a moderation focused discord bot with a wide variety of commands. The creation of Cora was to provide a reliable, dependable, & helpful tool that would service any sized community.',
        tags: ['Node.js', 'TypeScript', 'MariaDB'],
    },
    {
        title: 'Stubby',
        text: 'A simple Discord ticketing system bot. Allows you to create different categories that allows users to open a ticket based on those categories and have one on one conversations with those individuals.',
        tags: ['Node.js', 'TypeScript', 'MariaDB'],
    },
    {
        title: 'NotiFyre',
        text: 'A simple Discord reminder bot. This bot allows you to use simple times like 1h/1hour, 30m/30minutes, or 1d12hr15m, or specific times like 7pm, 7:00pm, or 19:00, or more complex dates and times like "next Friday at 3pm" or "the first Tuesday of next month at noon".',
        tags: ['Node.js', 'TypeScript', 'MariaDB'],
    },
];

export const websites: Item[] = [
    { title: 'hiekki.me', text: "My portfolio that you're currently scrolling through.", tags: ['Next.js', 'Tailwind CSS'] },
    { title: 'elenora.gg', text: 'A website for the Elenora discord bot.', tags: ['Next.js', 'Tailwind CSS'] },
    { title: 'haleyandkevin.info', text: "Me and my wife's wedding website.", tags: ['Next.js', 'Tailwind CSS'] },
];

export const databases: Item[] = [
    { title: 'MongoDB', text: 'A document database that stores data in JSON format.' },
    { title: 'MariaDB', text: 'A relational database that stores data in tables.' },
    { title: 'MySQL', text: 'A query or report language that allows you to query and manipulate data.' },
    { title: 'Prisma', text: 'A database client that allows you to interact with databases.' },
];

export const contact = {
    note: 'Links coming soon..',
};

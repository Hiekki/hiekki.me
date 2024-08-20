export const AboutMe = {
    title: 'About Me',
    description:
        'I am a full stack developer with a passion for creating innovative and user-friendly web applications. I am proficient in JavaScript, TypeScript, and have experience working with React, Next.js, Tailwind CSS, and Node.js. I am also familiar with SQL, MongoDB, and Git.',
    info: [
        {
            title: 'Name',
            description: 'Kevin Abernathy',
        },
        {
            title: 'Experience',
            description: '4+ Years',
        },
        {
            title: 'City',
            description: 'West Memphis',
        },
        {
            title: 'State',
            description: 'Arkansas',
        },
        {
            title: 'Discord',
            description: 'hiekki',
        },
        {
            title: 'Email',
            description: 'abernathy.kevin.n@gmail.com',
        },
    ],
};

export const Experience = {
    icon: '',
    title: 'My Experience',
    description:
        'Designed, developed, and maintained custom Discord bots and websites to meet specific client requirements. Oversaw and managed repositories of team members to ensure code cleanliness, consistency, and structure throughout the deployment process. Collaborated closely with clients to understand their needs and deliver tailored solutions, while ensuring high-quality standards and efficient workflow management.',
    info: [
        {
            company: 'Team Hydra',
            position: 'Developer',
            duration: 'Jul 2023 - Present',
        },
    ],
};

export const Education = {
    icon: '',
    title: 'My Education',
    description:
        'Self taught developer with experience in JavaScript, TypeScript, React, Next.js, MySQL, MongoDB, Node.js, and TailwindCSS. Currently looking into certifations.',
    info: [
        {
            insitution: 'Volunteer State Community College',
            degree: 'G.E.D.',
            duration: 'Feb 2010',
        },
        {
            insitution: 'McGavock High School',
            degree: 'N/A',
            duration: 'Aug 2006 - May 2009',
        },
    ],
};

export const Projects = [
    {
        number: '01',
        title: 'Elenora',
        description:
            'Elenora is a feature rich RuneScape Clan administration discord bot with a wide variety of commands. The creation of Elenora was to provide a reliable, dependable, & helpful tool that would service any sized community.',
        stack: [{ name: 'TypeScript' }, { name: 'MySQL' }, { name: 'Git' }],
        image: '/assets/projects/elenora.png',
        live: 'https://elenora.gg/',
        github: '#',
        invite: 'https://discord.com/oauth2/authorize?client_id=735842992002433084',
    },
    {
        number: '02',
        title: 'Simple Slash',
        description:
            "A simple wrapper for creating slash commands for Discord bots. Discord's conventional way of creating slash commands is very messy and time consuming to create. This project aims to make it easier for developers to create slash commands for their bots.",
        stack: [{ name: 'TypeScript' }, { name: 'Git' }],
        image: '/assets/projects/simpleslash.png',
        live: 'https://www.npmjs.com/package/@elenoragroup/simple-slash',
        github: 'https://github.com/Hiekki/SimpleSlash',
        invite: '#',
    },
    {
        number: '03',
        title: 'Stubby',
        description:
            'A simple Discord ticketing system bot. Allows you to create different categories that allows users to open a ticket based on those categories and have one on one conversations with those individuals.',
        stack: [{ name: 'TypeScript' }, { name: 'MySQL' }, { name: 'Node.js' }, { name: 'Git' }],
        image: '/assets/projects/stubby.png',
        live: '#',
        github: 'https://github.com/Hiekki/Stubby',
        invite: 'https://discord.com/oauth2/authorize?client_id=1262809684667011094',
    },
    {
        number: '04',
        title: 'NotiFyre',
        description:
            'A simple Discord reminder bot. This bot allows you to use simple times like 1h/1hour, 30m/30minutes, or 1d12hr15m, or specific times like 7pm, 7:00pm, or 19:00, or more complex dates and times like "next Friday at 3pm" or "the first Tuesday of next month at noon".',
        stack: [{ name: 'TypeScript' }, { name: 'MySQL' }, { name: 'Node.js' }, { name: 'Git' }],
        image: '/assets/projects/notifyre.png',
        live: '#',
        github: 'https://github.com/Hiekki/NotiFyre',
        invite: 'https://discord.com/oauth2/authorize?client_id=1248777984622465165',
    },
];

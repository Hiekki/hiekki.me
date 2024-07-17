'use client';

import CountUp from 'react-countup';

const stats = [
    { name: 'Years of Experience', value: new Date().getFullYear() - 2020 },
    { name: 'Public Projects', value: 3 },
    { name: 'Private Projects', value: 30 },
    { name: 'Language', value: 1 },
];

const Stats = () => {
    return (
        <section className='pb-12 pt-4 xl:pb-0 xl:pt-0'>
            <div className='container mx-auto'>
                <div className='mx-auto flex max-w-[80vh] flex-wrap gap-6 xl:max-w-none'>
                    {stats.map((stat, index) => (
                        <div key={index} className='flex flex-1 items-center justify-center gap-4 xl:justify-start'>
                            <CountUp end={stat.value} duration={5} delay={2} className='text-4xl font-extrabold xl:text-6xl' />
                            <p className='ml-[-20px] text-4xl font-extrabold xl:text-6xl'>+</p>
                            <p
                                className={`${
                                    stat.name.length > 15 ? 'max-w-[100px]' : 'max-w-[150px]'
                                } leading-snug text-black/80 dark:text-white/80`}
                            >
                                {stat.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;

'use client';

import CountUp from 'react-countup';

const stats = [
    { name: 'Years of Experience', value: new Date().getFullYear() - 2020 },
    { name: 'Other Things', value: 12 },
    { name: 'Idk what to put here', value: 800 },
    { name: 'Still thinking', value: 16 },
];

const Stats = () => {
    return (
        <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
            <div className="container mx-auto">
                <div className="flex flex-wrap gap-6 max-w-[80vh] mx-auto xl:max-w-none">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex-1 flex gap-4 items-center justify-center xl:justify-start">
                            <CountUp end={stat.value} duration={5} delay={2} className="text-4xl xl:text-6xl font-extrabold" />
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

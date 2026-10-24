import type { Metadata } from 'next';
import Link from 'next/link';
import { sections, site } from '@/lib/data';
import { panelBodies, ResumeLink } from '@/components/Panels';

const name = site.nameLines.join(' ');

export const metadata: Metadata = {
    title: `${name} | Plain version`,
    description: site.tagline,
};

// The same content as the animated home page, as an ordinary scrolling page.
export default function Plain() {
    return (
        <main className='min-h-screen bg-bg px-[max(16px,env(safe-area-inset-left))] py-14 sm:py-20'>
            <div className='mx-auto max-w-170'>
                <h1 className='text-balance text-[clamp(2.4rem,9vw,4rem)] leading-none font-extrabold tracking-[-0.03em]'>{name}</h1>
                <p className='mt-3 text-[1.15rem] text-muted'>{site.tagline}</p>
                <div className='mt-5 flex flex-wrap items-center gap-3' style={{ '--c': 'rgb(255,185,56)' } as React.CSSProperties}>
                    <ResumeLink />
                    <Link href='/' className='text-[0.92rem] text-muted underline underline-offset-4'>
                        See the animated version
                    </Link>
                </div>

                {sections.map((s, i) => (
                    <section
                        key={s.id}
                        aria-labelledby={`h-${s.id}`}
                        className='mt-14'
                        style={{ '--c': `rgb(${s.color.join(',')})` } as React.CSSProperties}
                    >
                        <h2
                            id={`h-${s.id}`}
                            className='text-balance text-[clamp(1.8rem,7vw,2.6rem)] leading-none font-extrabold tracking-[-0.03em]'
                        >
                            {s.heading}
                        </h2>
                        <p className='mt-3 mb-5 max-w-[32em] text-[1.02rem] text-muted'>{s.blurb}</p>
                        {panelBodies[i]}
                    </section>
                ))}
            </div>
        </main>
    );
}

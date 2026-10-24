import type { Metadata } from 'next';
import BackLink from '@/components/BackLink';
import PrintButton from '@/components/PrintButton';
import { bots, jobs, site, skills, websites } from '@/lib/data';

const name = site.nameLines.join(' ');

export const metadata: Metadata = { title: `${name} | Résumé` };

// A print-ready résumé built from lib/data.ts. "Save as PDF" opens the browser's print dialog.
export default function Resume() {
    return (
        <main className='resume-wrap min-h-screen bg-[#eceef2] px-[max(16px,env(safe-area-inset-left))] py-8 text-[#14171f]'>
            <div className='no-print mx-auto mb-5 flex max-w-205 flex-wrap items-center justify-between gap-3'>
                <BackLink className='text-[0.92rem] font-medium underline underline-offset-4' />
                <PrintButton />
            </div>

            <article className='resume-paper mx-auto max-w-205 bg-white px-6 py-8 shadow-sm sm:px-12 sm:py-12'>
                <header className='border-b border-[#d6dae3] pb-4'>
                    <h1 className='text-[2rem] leading-tight font-extrabold tracking-tight'>{name}</h1>
                    <p className='mt-0.5 text-[1.02rem] text-[#4a5164]'>{site.tagline}</p>
                    <p className='mt-2 text-[0.92rem] text-[#4a5164]'>
                        {site.email} · {site.phone} · {site.location}
                    </p>
                </header>

                <Section title='Summary'>
                    <p>{site.summary}</p>
                </Section>

                <Section title='Experience'>
                    <div className='grid gap-5'>
                        {jobs.map((j) => (
                            <div key={j.company + j.dates} className='break-inside-avoid'>
                                <div className='flex flex-wrap items-baseline justify-between gap-x-4'>
                                    <h3 className='text-[1.05rem] font-bold'>{j.roles ? j.company : (j.title ?? j.company)}</h3>
                                    <span className='text-[0.9rem] text-[#4a5164]'>{j.dates}</span>
                                </div>
                                <p className='text-[0.95rem] text-[#4a5164]'>{j.roles ? j.where : j.company}</p>
                                {j.description && <p className='mt-1.5'>{j.description}</p>}
                                {j.roles && (
                                    <ul className='mt-2 grid gap-2'>
                                        {j.roles.map((r) => (
                                            <li key={r.title + r.dates}>
                                                <div className='flex flex-wrap items-baseline justify-between gap-x-4'>
                                                    <b>{r.title}</b>
                                                    <span className='text-[0.88rem] text-[#4a5164]'>
                                                        {r.dates} ({r.duration})
                                                    </span>
                                                </div>
                                                <p className='text-[0.95rem]'>{r.note}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </Section>

                <Section title='Projects'>
                    <ul className='grid gap-2'>
                        {[...bots, ...websites].map((p) => (
                            <li key={p.title} className='break-inside-avoid'>
                                <b>{p.title}</b>
                                {p.tags?.length ? <span className='text-[#4a5164]'> ({p.tags.join(', ')})</span> : null}
                                <p className='text-[0.95rem]'>{p.text}</p>
                            </li>
                        ))}
                    </ul>
                </Section>

                <Section title='Skills'>
                    <ul className='grid gap-1'>
                        {skills.map((s) => (
                            <li key={s.label}>
                                <b>{s.label}:</b> {s.items.join(', ')}
                            </li>
                        ))}
                    </ul>
                </Section>
            </article>
        </main>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className='mt-6'>
            <h2 className='mb-2 border-b border-[#d6dae3] pb-1 text-[1.05rem] font-bold tracking-tight'>{title}</h2>
            <div className='text-[0.98rem] leading-relaxed'>{children}</div>
        </section>
    );
}

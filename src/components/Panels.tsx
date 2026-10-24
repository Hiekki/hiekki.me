import Link from 'next/link';
import { bots, contact, databases, jobs, site, websites } from '@/lib/data';
import type { Item, Job } from '@/lib/data';
import CopyButton from './CopyButton';

const card = 'min-w-0 rounded-[22px] border border-edge bg-card p-5';

export function Tags({ tags }: { tags?: string[] }) {
    if (!tags?.length) return null;
    return (
        <ul className='mt-3 flex flex-wrap gap-1.5'>
            {tags.map((t) => (
                <li key={t} className='rounded-full border border-edge px-3 py-0.5 font-mono text-[0.78rem] text-(--c)'>
                    {t}
                </li>
            ))}
        </ul>
    );
}

export function ItemCards({ items }: { items: Item[] }) {
    return (
        <div className='grid gap-3'>
            {items.map((it) => (
                <div key={it.title} className={card}>
                    <h3 className='text-[1.12rem] font-bold'>{it.title}</h3>
                    <p className='mt-1.5 text-muted'>{it.text}</p>
                    <Tags tags={it.tags} />
                </div>
            ))}
        </div>
    );
}

export function JobCard({ job }: { job: Job }) {
    const head = job.roles ? job.company : (job.title ?? job.company);
    const sub = job.roles ? job.where : job.company;
    return (
        <div className={card}>
            <div className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5'>
                <h3 className='text-[1.3rem] font-bold tracking-tight'>{head}</h3>
                <span className='font-mono text-[0.82rem] text-(--c)'>{job.dates}</span>
            </div>
            {sub && <p className='mt-1 text-[0.98rem]'>{sub}</p>}
            {job.badge && (
                <span className='mt-3 inline-block rounded-full border border-(--c) px-3 py-0.5 font-mono text-[0.78rem] text-(--c)'>
                    {job.badge}
                </span>
            )}
            {job.description && <p className='mt-3 text-muted'>{job.description}</p>}
            {job.roles && (
                <ol className='mt-4 grid'>
                    {job.roles.map((r, i) => (
                        <li key={r.title + r.dates} className={'path-step' + (i === 0 ? ' now' : '')}>
                            <div className='flex flex-wrap items-baseline justify-between gap-x-3'>
                                <b className='text-[1.02rem]'>{r.title}</b>
                                <span className='font-mono text-[0.78rem] text-muted'>{r.duration}</span>
                            </div>
                            <div className='mt-px font-mono text-[0.8rem] text-(--c)'>{r.dates}</div>
                            <p className='mt-1 text-[0.95rem] text-muted'>{r.note}</p>
                        </li>
                    ))}
                </ol>
            )}
        </div>
    );
}

export function ResumeLink() {
    const cls =
        'inline-flex cursor-pointer items-center rounded-full border border-(--c) px-4 py-2 text-[0.92rem] font-semibold text-(--c)';
    if (site.resumeHref.endsWith('.pdf')) {
        return (
            <a href={site.resumeHref} download className={cls}>
                Download résumé
            </a>
        );
    }
    return (
        <Link href={site.resumeHref} className={cls}>
            Download résumé
        </Link>
    );
}

// One entry per section, in the same order as `sections` in lib/data.ts.
export const panelBodies: React.ReactNode[] = [
    <div key='work' className='grid gap-3'>
        {jobs.map((j) => (
            <JobCard key={j.company + j.dates} job={j} />
        ))}
        <div className='mt-1'>
            <ResumeLink />
        </div>
    </div>,
    <ItemCards key='bots' items={bots} />,
    <ItemCards key='sites' items={websites} />,
    <ItemCards key='data' items={databases} />,
    <div key='contact' className={card}>
        <div className='flex flex-wrap items-center gap-2.5'>
            <code className='wrap-break-word font-mono text-[1.05rem] font-medium select-all'>{site.email}</code>
            <CopyButton text={site.email} />
        </div>
        <p className='mt-1.5 text-muted'>{contact.note}</p>
        <div className='mt-4'>
            <ResumeLink />
        </div>
    </div>,
];

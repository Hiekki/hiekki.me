export type LegalSection = { heading: string; paras?: string[]; list?: string[] };

export default function LegalPage({
    title,
    updated,
    intro,
    sections,
}: {
    title: string;
    updated: string;
    intro: string;
    sections: LegalSection[];
}) {
    return (
        <main className='min-h-screen bg-bg px-[max(16px,env(safe-area-inset-left))] py-14 sm:py-20'>
            <article className='mx-auto max-w-170 text-[1.02rem] leading-relaxed'>
                <h1 className='text-balance text-[clamp(2rem,7vw,3rem)] leading-tight font-extrabold tracking-tight'>{title}</h1>
                <p className='mt-2 text-muted'>Last updated {updated}</p>
                <p className='mt-6'>{intro}</p>
                {sections.map((s) => (
                    <section key={s.heading} className='mt-9'>
                        <h2 className='text-[1.3rem] font-bold tracking-tight'>{s.heading}</h2>
                        {s.paras?.map((p) => (
                            <p key={p} className='mt-3 text-muted'>
                                {p}
                            </p>
                        ))}
                        {s.list && (
                            <ul className='mt-3 list-disc space-y-1.5 pl-6 text-muted marker:text-edge'>
                                {s.list.map((li) => (
                                    <li key={li}>{li}</li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}
            </article>
        </main>
    );
}

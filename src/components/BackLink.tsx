'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Returns to whichever page of this site you came from (animated or plain).
// With no history on this site, it falls back to the home page.
export default function BackLink({ className }: { className?: string }) {
    const router = useRouter();
    return (
        <Link
            href='/'
            className={className}
            onClick={(e) => {
                const fromHere = document.referrer && new URL(document.referrer).origin === window.location.origin;
                if (fromHere && window.history.length > 1) {
                    e.preventDefault();
                    router.back();
                }
            }}
        >
            Back to the site
        </Link>
    );
}

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                'flex min-h-[80px] w-full rounded-md border-black/10 bg-primary px-4 py-5 text-base font-light outline-none placeholder:text-black/60 focus-visible:ring-2 focus-visible:ring-purple-500 dark:border-white/10 dark:bg-dark dark:placeholder:text-white/60 dark:focus-visible:ring-purple-500',
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});
Textarea.displayName = 'Textarea';

export { Textarea };

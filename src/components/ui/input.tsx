import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                'flex h-[48px] rounded-md border-black/10 dark:border-white/10 focus-visible:ring-2 focus-visible:ring-purple-500 dark:focus-visible:ring-purple-500 font-light bg-primary dark:bg-dark px-4 py-5 text-base placeholder:text-black/60 dark:placeholder:text-white/60 outline-none',
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = 'Input';

export { Input };

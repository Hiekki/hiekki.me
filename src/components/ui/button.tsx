import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold ring-offset-white transition-colors',
    {
        variants: {
            variant: {
                default: 'bg-purple-500 text-white hover:bg-purple-600 dark:hover:bg-purple-400',
                primary: '',
                outline:
                    'border border-purple-500 hover:border-purple-600 dark:hover:border-purple-400 background-transparent hover:bg-purple-600 dark:hover:bg-purple-400 text-purple-500 hover:text-white',
            },
            size: {
                default: 'h-[44px] px-6',
                md: 'h-[48px] px-6',
                lg: 'h-[56px] px-8 text-sm uppercase tracking-[2px]',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };

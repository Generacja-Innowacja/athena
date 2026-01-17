import { ClassProp } from 'class-variance-authority/types';
import { JSX } from 'react/jsx-runtime';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React_2 from 'react';
import { VariantProps } from 'class-variance-authority';

export declare function Button({ className, variant, size, asChild, ...props }: React_2.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
}): JSX.Element;

export declare const buttonVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function RadioGroup({ className, ...props }: React_2.ComponentProps<typeof RadioGroupPrimitive.Root>): JSX.Element;

export declare function RadioGroupItem({ className, ...props }: React_2.ComponentProps<typeof RadioGroupPrimitive.Item>): JSX.Element;

export { }

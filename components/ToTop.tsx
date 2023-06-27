import React, { useState} from 'react';

const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600',
    secondary: 'bg-gray-500 hover:bg-gray-600',
    default: ""
}

export type ToTopProps = {
    variant: keyof typeof variants;
    children?: React.ReactNode;
};

const ToTop = ({ variant = "default", children } : ToTopProps) => {
    console.log("My variant is: ", variant);
    return (
        <div className={variants[variant]}>
            <span>{variant}</span>
            <div>
                {children}
            </div>
        </div>
    )
}

export default ToTop;
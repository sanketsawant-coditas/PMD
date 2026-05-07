import React from "react";

interface ButtonInfo extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    varites?: "primary" | "secondary" | "danger";
    loading? : boolean;
};

export const Button: React.FC<ButtonInfo> = ({
    children,
    varites = "primary",
    loading,
    ...props
}) => {
    <button
    className={''}
    disabled = {loading || props.disabled}>
        {loading ? "Loading...": children}
    </button>
}
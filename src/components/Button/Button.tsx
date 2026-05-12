import React from "react";
import styles from "./Button.module.scss";

interface ButtonInfo extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

export const Button: React.FC<ButtonInfo> = ({
  children,
  variant = "primary",
  loading = false,
  type = "button",
  disabled,
  ...props
}) => {
  const isDisabled = loading || disabled;

  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      disabled={isDisabled}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

Button.displayName = "Button";
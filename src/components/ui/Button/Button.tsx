import React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
    children: React.ReactNode
    onClick?: (e: React.MouseEvent) => void
    variant?: 'init' | 'liked'
    mode?: 'icon' | 'text' | 'both'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant = 'init',
    mode = 'icon',
    type = 'button',
    disabled = false,
}) => {
    const buttonClass = `${styles.button} ${styles[variant]} ${styles[mode]}`

    return (
        <button
            type={type}
            className={buttonClass}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

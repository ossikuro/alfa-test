import React from 'react'
import styles from './Input.module.css'

interface InputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    label?: string
    type?: 'text' | 'number' | 'email' | 'password'
    multiline?: boolean
    rows?: number
    required?: boolean
    error?: string
}

export const Input: React.FC<InputProps> = ({
    value,
    onChange,
    placeholder = '',
    label,
    type = 'text',
    multiline = false,
    rows = 3,
    required = false,
    error,
}) => {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        onChange(e.target.value)
    }

    return (
        <div className={styles.inputContainer}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}

            {multiline ? (
                <textarea
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    rows={rows}
                    className={`${styles.input} ${styles.textarea} ${
                        error ? styles.error : ''
                    }`}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={`${styles.input} ${error ? styles.error : ''}`}
                />
            )}

            {error && <p className={styles.errorText}>{error}</p>}
        </div>
    )
}

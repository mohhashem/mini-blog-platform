'use client';

import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

export interface InputFieldHandle {
    getValue: () => string;
    setValue: (val: string) => void;
    setError: (error: string) => void;
    clearError: () => void;
    disable: () => void;
    enable: () => void;
    hide: () => void;
    show: () => void;
}

interface InputFieldProps {
    label: string;
    type?: string;
    defaultValue?: string;
}

const InputField = forwardRef<InputFieldHandle, InputFieldProps>(
    ({ label, type = 'text', defaultValue = '' }, ref) => {
        const inputRef = useRef<HTMLInputElement | null>(null);
        const [error, setErrorState] = useState<string | null>(null);
        const [disabled, setDisabled] = useState(false);
        const [hidden, setHidden] = useState(false);
        const [value, setValueState] = useState(defaultValue);

        useEffect(() => {
            setValueState(defaultValue);
        }, [defaultValue]);

        useImperativeHandle(ref, () => ({
            getValue: () => inputRef.current?.value || '',
            setValue: (val: string) => setValueState(val),
            setError: (msg) => setErrorState(msg),
            clearError: () => setErrorState(null),
            disable: () => setDisabled(true),
            enable: () => setDisabled(false),
            hide: () => setHidden(true),
            show: () => setHidden(false),
        }));

        if (hidden) return null;

        return (
            <TextField
                inputRef={inputRef}
                label={label}
                value={value}
                onChange={(e) => {
                    setValueState(e.target.value);
                    if (error) setErrorState(null); 
                }}
                type={type}
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error}
                disabled={disabled}
            />
        );
    }
);

export default InputField;

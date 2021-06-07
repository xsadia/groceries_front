import { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import { Container } from "./style";
import { useField } from '@unform/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

export function Input({ name, ...rest }: InputProps) {

    const [isFilled, setIsFilled] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { fieldName, defaultValue, error, registerField } = useField(name);

    const handleInputBlur = useCallback(() => {
        setIsFilled(!!inputRef.current?.value);
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, registerField]);

    return (
        <Container isErrored={!!error} isFilled={isFilled}>
            <input defaultValue={defaultValue} ref={inputRef} onBlur={handleInputBlur} {...rest} />
            <span>{error && error}</span>
        </Container>
    );
}
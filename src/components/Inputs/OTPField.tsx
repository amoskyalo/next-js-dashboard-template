import { TextField, Stack, InputLabel, FormHelperText } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { OTPFieldProps } from './types';

export const OTPField = ({ length, label, size, error, helperText, onChange, ...rest }: OTPFieldProps) => {
    const [otp, setOtp] = useState<string[]>([]);
    const [focusedIndex, setFocusedIndex] = useState<number>(0);
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const totalLength = length ?? 4;

    const handleChange = (index: number, value: string) => {
        setOtp((prev) => {
            const newOtp = [...prev];
            newOtp[index] = value;
            return newOtp;
        });

        if (value !== '') {
            if (index !== totalLength - 1) {
                inputRefs.current[index + 1].focus();
                setFocusedIndex(index + 1);
            } else {
                inputRefs.current[index].blur();
                setFocusedIndex(0);
            }
        } else if (index !== 0) {
            inputRefs.current[index - 1].focus();
            setFocusedIndex(index - 1);
        }
    };

    useEffect(() => {
        typeof onChange === 'function' && onChange(otp.join(''));
    }, [otp]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;
            const focusedInputEmpty = otp[focusedIndex] === '' || !otp[focusedIndex];
            const isFirstInput = focusedIndex === 0;
            const isLastInput = focusedIndex === totalLength - 1;
            const arrowLeftIndex = focusedIndex - 1;
            const arrowRightIndex = focusedIndex + 1;

            if (key === 'ArrowLeft') {
                if (isFirstInput) {
                    e.preventDefault();
                    return;
                }

                inputRefs.current[arrowLeftIndex].focus();
                setTimeout(() => {
                    inputRefs.current[arrowLeftIndex].setSelectionRange(1, 1);
                }, 0);
                setFocusedIndex(arrowLeftIndex);
            } else if (key === 'ArrowRight' && !focusedInputEmpty && !isLastInput) {
                inputRefs.current[arrowRightIndex].focus();
                setFocusedIndex(arrowRightIndex);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [focusedIndex]);

    const inputSize = size ?? 'small';
    const inputWidth = inputSize === 'small' ? '40px' : '56px';

    return (
        <Stack spacing={0.5}>
            <InputLabel>{label}</InputLabel>
            <Stack direction="row" spacing={1}>
                {Array.from({ length: totalLength }).map((_, index) => (
                    <TextField
                        key={index}
                        value={otp[index] || ''}
                        size={inputSize}
                        error={error}
                        placeholder="-"
                        inputRef={(ref) => (inputRefs.current[index] = ref)}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onClick={(e) => {
                            e.currentTarget.blur();
                        }}
                        slotProps={{
                            htmlInput: {
                                maxLength: 1,
                                style: { textAlign: 'center' },
                            },
                            input: {
                                style: {
                                    width: inputWidth,
                                    pointerEvents: index !== 0 && (otp[index - 1] === '' || !otp[index - 1]) ? 'none' : 'auto',
                                },
                            },
                        }}
                        {...rest}
                    />
                ))}
            </Stack>
            {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
        </Stack>
    );
};

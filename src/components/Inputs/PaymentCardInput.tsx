import { Stack, TextField, InputLabel, InputAdornment, Grid2 as Grid, Box, FormHelperText } from '@mui/material';
import { useState, useEffect } from 'react';
import { CardType } from '@/utils/type';
import { PaymentCardInputProps } from './types';
import Image from 'next/image';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import utils from '@/utils';

export const PaymentCardInput = ({ onChange, error, errorMessages }: PaymentCardInputProps) => {
    const [cardNumber, setCardNumber] = useState<string | null>('');
    const [expiryDate, setExpiryDate] = useState<string | null>('');
    const [cvv, setCvv] = useState<string | null>('');
    const [cardType, setCardType] = useState<CardType>('visa');

    const cardNumberError = Boolean(errorMessages?.cardNumber);
    const expiryDateError = Boolean(errorMessages?.expiryDate);
    const cvvError = Boolean(errorMessages?.cvv);

    useEffect(() => {
        const value = cardNumber?.replace(/\s+/g, '');
        if (value && value.length >= 15) {
            setCardType(utils.getCardType(value));
        }
    }, [cardNumber]);

    useEffect(() => {
        onChange?.({
            cardNumber: cardNumber?.replace(/\s+/g, '') ?? null,
            expiryDate: expiryDate?.replace(/\//g, '') ?? null,
            cvv,
        });
    }, [cardNumber, expiryDate, cvv]);

    function getCardDimensions(cardType: CardType) {
        switch (cardType) {
            case 'visa':
                return { width: 40, height: 40 };
            case 'mastercard':
                return { width: 35, height: 35 };
            case 'amex':
                return { width: 30, height: 20 };
            default:
                return { width: 0, height: 0 };
        }
    }

    const getErrorMessage = () => {
        if (cardNumberError && expiryDateError && cvvError) {
            return 'Invalid card information details';
        }

        if (cardNumberError || expiryDateError) {
            return errorMessages?.cardNumber ?? errorMessages?.expiryDate;
        }

        if (expiryDateError || cvvError) {
            return errorMessages?.expiryDate ?? errorMessages?.cvv;
        }
    };

    const handleChangeCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, selectionStart } = e.target;
        const unformattedValue = value.replace(/\s+/g, '');

        const isDeleting = value.length < (cardNumber ?? '').length;

        if (isDeleting && selectionStart && (cardNumber ?? '')[selectionStart] === ' ') {
            setCardNumber((cardNumber ?? '').slice(0, -1));
        } else {
            setCardNumber(utils.formatCardNumber(unformattedValue));
        }
    };

    const handleChangeExpiryDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, selectionStart } = e.target;
        const unformattedValue = value.replace(/\//g, '');

        const isDeleting = value.length < (expiryDate ?? '').length;

        if (isDeleting && selectionStart && (expiryDate ?? '')[selectionStart] === '/') {
            setExpiryDate((expiryDate ?? '').slice(0, -1));
        } else {
            setExpiryDate(utils.formatCardExpiryDate(unformattedValue));
        }
    };

    return (
        <Stack spacing={0.5}>
            <InputLabel>Card Information</InputLabel>
            <Box>
                <TextField
                    size="small"
                    value={cardNumber ?? ''}
                    fullWidth
                    error={cardNumberError}
                    placeholder="0000 0000 0000 0000"
                    onChange={handleChangeCardNumber}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    {cardType === 'unknown' ? (
                                        <ErrorOutlineIcon color="error" fontSize="small" />
                                    ) : (
                                        <Image src={`/assets/icons/${cardType}.svg`} alt="payment card icon" {...getCardDimensions(cardType)} />
                                    )}
                                </InputAdornment>
                            ),
                            style: {
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                            },
                        },
                        htmlInput: { maxLength: 20 },
                    }}
                />
                <Grid container sx={{ mt: -0.1 }}>
                    <Grid size={6}>
                        <TextField
                            size="small"
                            placeholder="MM / YY"
                            value={expiryDate ?? ''}
                            error={expiryDateError}
                            onChange={handleChangeExpiryDate}
                            slotProps={{
                                input: {
                                    style: {
                                        borderTopLeftRadius: 0,
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0,
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {expiryDateError && <ErrorOutlineIcon fontSize="small" color="error" />}
                                        </InputAdornment>
                                    ),
                                },
                                htmlInput: { maxLength: 5 },
                            }}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            size="small"
                            placeholder="CVV"
                            value={cvv ?? ''}
                            error={cvvError}
                            onChange={(e) => {
                                setCvv(e.target.value);
                            }}
                            slotProps={{
                                input: {
                                    style: {
                                        borderTopLeftRadius: 0,
                                        borderTopRightRadius: 0,
                                        borderBottomLeftRadius: 0,
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {cvvError && <ErrorOutlineIcon fontSize="small" color="error" />}
                                        </InputAdornment>
                                    ),
                                },
                                htmlInput: { maxLength: 4 },
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
            {Boolean(getErrorMessage()) && (
                <FormHelperText error sx={{ pl: 2 }}>
                    {getErrorMessage()}
                </FormHelperText>
            )}
        </Stack>
    );
};

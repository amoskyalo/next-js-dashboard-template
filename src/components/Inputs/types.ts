import { TextFieldProps } from '@mui/material';
import { CountryCode } from 'libphonenumber-js';

export type PaymentCardInputOnChangeArgs = {
    cardNumber: string | null;
    expiryDate: string | null;
    cvv: string | null;
};

export type PhoneNumberInputOnChangeArgs = {
    event: React.SyntheticEvent;
    callingCode: string | number;
    countryCode: CountryCode;
    value: string;
};

export type PhoneNumberInputProps = Omit<TextFieldProps, 'onChange'> & {
    poperWidth?: number;
    colorIndex?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    onChange?: (arg: PhoneNumberInputOnChangeArgs) => void;
};

export type OTPFieldProps = Omit<TextFieldProps, 'onChange'> & {
    length?: number;
    onChange?: (arg: string | number) => void;
};

export type PaymentCardInputProps = Omit<TextFieldProps, 'onChange' | 'heperText'> & {
    onChange?: (arg: PaymentCardInputOnChangeArgs) => void;
    errorMessages?: {
        cardNumber?: string;
        expiryDate?: string;
        cvv?: string;
    };
};

export type Country = {
    name: string;
    flag: string;
    callingCode: number;
    codeName: CountryCode;
};

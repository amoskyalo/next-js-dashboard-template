import { TextFieldProps, AutocompleteProps, SelectProps, CheckboxProps } from '@mui/material';
import { CountryCode } from 'libphonenumber-js';

export type PaymentCardInputOnChangeArgs = {
    cardNumber: string | null;
    expiryDate: string | null;
    cvv: string | null;
};

export type PhoneNumberInputOnChangeArgs = {
    event: React.SyntheticEvent;
    phone: string | number;
    code: CountryCode;
    value: string;
};

export type PhoneNumberInputProps = Omit<TextFieldProps, 'onChange'> & {
    poperWidth?: number;
    colorIndex?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    onChange?: (arg: PhoneNumberInputOnChangeArgs) => void;
};

export type OTPFieldProps = Omit<TextFieldProps, 'onChange' | 'placeholder'> & {
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

export type AutocompleteFieldProps = Omit<AutocompleteProps<any, any, any, any>, 'renderInput'> & {
    label?: string;
    error?: boolean;
    helperText?: string;
    placeholder?: string;
};

export type SelectFieldProps = SelectProps & {
    options?: { value: string | number; label: string }[];
    children?: React.ReactNode;
    helperText?: string | boolean;
};

export type CheckboxInputProps = CheckboxProps & {
    label: string;
};

export type GroupedCheckboxInputProps = {
    options: { name: string; value: any }[];
    label?: string;
    error?: boolean;
    helperText?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: any) => void;
    value?: any;
    multiple?: boolean;
};

export type Country = {
    code: string;
    label: string;
    phone: string;
};

export type MainTextMatchedSubstrings = {
    offset: number;
    length: number;
};

export type StructuredFormatting = {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
};

export type PlaceType = {
    description: string;
    structured_formatting: StructuredFormatting;
};

export type PlacesSelectInputProps = {
    onChange?: (value: string) => void;
    label?: string;
    placeholder?: string;
    helperText?: string;
    error?: boolean;
    defaultValue?: string;
};

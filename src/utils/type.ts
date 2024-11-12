import { FormikProps } from 'formik';

export type AnonymouseObject = {
    [index: string]: string | number;
};

export type GetFormikFieldPropsArgs<Type> = {
    formik: FormikProps<Type>;
    field: keyof Type;
    isAutoComplete?: boolean;
    isPhoneNumber?: boolean;
    isCardInformation?: boolean;
    isOTP?: boolean;
};

export type CardType = 'visa' | 'mastercard' | 'amex' | 'unknown';

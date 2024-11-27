import { FormikProps } from 'formik';
import { APIResponse } from '@/api';
import { Dispatch, SetStateAction } from 'react';

export type CardType = 'visa' | 'mastercard' | 'amex' | 'unknown';

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
    isGroupedCheckbox?: boolean;
    isLocation?: boolean;
};

export type MutateOptionsProps<TData> = {
    successAsyncCallback?: (arg: APIResponse<TData>) => Promise<void>;
    successCallback?: (arg: APIResponse<TData>) => void;
    errorCallback?: (arg: APIResponse<TData>) => void;
    setLoading?: Dispatch<SetStateAction<boolean>>;
};

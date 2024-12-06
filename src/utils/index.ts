import { CardType, GetFormikFieldPropsArgs, MutateOptionsProps } from './type';
import { array, number, string, object } from 'yup';
import { isValidPhoneNumber, validatePhoneNumberLength, CountryCode, AsYouType } from 'libphonenumber-js';
import { PhoneNumberInputOnChangeArgs, PaymentCardInputOnChangeArgs } from '@/components/Inputs/types';
import { useResponsiveness } from '@/hooks';
import { GridColDef, GridRowModel } from '@mui/x-data-grid';
import { APIResponse } from '@/api';
import { snackbarToast } from '@/components/Snackbar';

const Utilities = class {
    constructor() {
        this.validateCardNumber = this.validateCardNumber.bind(this);
        this.formatCardNumber = this.formatCardNumber.bind(this);
        this.getCardType = this.getCardType.bind(this);
        this.formatCardExpiryDate = this.formatCardExpiryDate.bind(this);
    }

    getValidationSchema(args: Array<{ type: string; name: string }>, countryCode?: CountryCode) {
        const email_v = string().email().required('Email is required');
        const password_v = string().required('Password is required');
        const number_v = number().required('Number is required');
        const array_v = array().of(string()).required('Array is required');
        const card_information = object({
            cardNumber: string()
                .required('Card number is required')
                .test('isValidCardNumber', 'Invalid card number', (cardNumber) => {
                    if (cardNumber) {
                        return this.validateCardNumber(cardNumber);
                    }

                    return true;
                }),
            expiryDate: string()
                .required('Expiry date is required')
                .test('isValidExpiryDate', 'Expiry dates are in the past', (expiryDate) => {
                    if (expiryDate && expiryDate.length === 4) {
                        const year = Number(expiryDate.slice(2));
                        const thisYear = String(new Date().getFullYear()).slice(2);

                        const month = Number(expiryDate.slice(0, 2));
                        const currentMonth = new Date().getMonth() + 1;

                        const isValid = month >= currentMonth && year >= parseInt(thisYear);

                        return isValid;
                    }

                    return true;
                })
                .test('invalidExpiryYear', 'Card expipy details are invalid', (expiryDate) => {
                    if (expiryDate) {
                        const year = Number(expiryDate.slice(2));
                        const month = Number(expiryDate.slice(0, 2));

                        return month !== 0 && year < 80;
                    }

                    return true;
                }),
            cvv: string().required('CVV is required'),
        });

        const phone_number_v = string()
            .required('Phone number is required')
            .typeError('Invalid phone number')
            .test('isValid', 'Invalid phone number', (value) => isValidPhoneNumber(String(value), countryCode))
            .test(
                'isValidLength',
                'Invalid phone number length',
                (value) => validatePhoneNumberLength(String(value), countryCode) === undefined,
            );

        function getFieldValidationType(type: string) {
            switch (type) {
                case 'email':
                    return email_v;
                case 'password':
                    return password_v;
                case 'phone_number':
                    return phone_number_v;
                case 'number':
                    return number_v;
                case 'array':
                    return array_v;
                case 'card_information':
                    return card_information;
                default:
                    return string().required('Field is required');
            }
        }

        const schema = args.reduce<Record<string, ReturnType<typeof getFieldValidationType>>>((acc, arg) => {
            acc[arg.name] = getFieldValidationType(arg.type);
            return acc;
        }, {});

        return object().shape(schema);
    }

    getFormikFieldProps<Type>(args: GetFormikFieldPropsArgs<Type>): any {
        const {
            formik,
            field,
            isPhoneNumber,
            isAutoComplete,
            isCardInformation,
            isOTP,
            isGroupedCheckbox,
            isLocation,
        } = args;
        const { values, errors, touched, getFieldProps, setFieldValue } = formik;

        const formField = String(field);

        const error = touched[field] && Boolean(errors[field]);
        const helperText = touched[field] && (errors[field] as any);

        const handlePhoneNumberChange = ({ value, code, phone }: PhoneNumberInputOnChangeArgs) => {
            const startIndex = String(phone).length > 4 ? 2 : 1;
            const formatedValue = new AsYouType(code).input(phone + value);

            setFieldValue(formField, String(formatedValue).split(' ').slice(startIndex).join(' '));
        };

        const handleAutoCompleteChange = (__: React.SyntheticEvent, newValue: any) => {
            setFieldValue(formField, newValue);
        };

        const handleCardChange = ({ cardNumber, expiryDate, cvv }: PaymentCardInputOnChangeArgs) => {
            setFieldValue(formField, { cardNumber, expiryDate, cvv });
        };

        const handleOTPChange = (value: string) => {
            setFieldValue(formField, value);
        };

        const handleGroupedCheckboxChange = (__: React.ChangeEvent<HTMLInputElement>, newValue: any) => {
            setFieldValue(formField, newValue);
        };

        const commonProps = {
            error,
            helperText,
        };

        if (isAutoComplete) {
            return {
                onChange: handleAutoCompleteChange,
                multiple: true,
                value: values[field],
                ...commonProps,
            };
        }

        if (isPhoneNumber) {
            return {
                onChange: handlePhoneNumberChange,
                value: values[field],
                ...commonProps,
            };
        }

        if (isCardInformation) {
            return {
                onChange: handleCardChange,
                value: values[field],
                errorMessages: helperText,
                error,
            };
        }

        if (isOTP || isLocation) {
            return {
                onChange: handleOTPChange,
                ...commonProps,
            };
        }

        if (isGroupedCheckbox) {
            return {
                onChange: handleGroupedCheckboxChange,
                ...commonProps,
            };
        }

        return {
            ...commonProps,
            ...getFieldProps(formField),
        };
    }

    validateCardNumber(cardNumber: string) {
        let sum = 0;
        let isSecond = false;

        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i), 10);

            if (isSecond) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            isSecond = !isSecond;
        }

        return sum % 10 === 0;
    }

    formatCardNumber(cardNumber: string) {
        let formattedNumber = '';
        let startIndex = 0;
        let groupLength = 4;

        for (let i = groupLength; i < cardNumber.length + groupLength; i += groupLength) {
            const v = cardNumber.slice(startIndex, i) + ' ';
            formattedNumber += v;
            startIndex += 4;
        }

        return formattedNumber;
    }

    getCardType(cardNumber: string): CardType {
        const patterns = {
            visa: /^4\d{12}(?:\d{3})?$/,
            mastercard: /^5[1-5]\d{14}$/,
            amex: /^3[47]\d{13}$/,
            discover: /^6(?:011|5\d{2})\d{12}$/,
        };

        for (const [cardType, pattern] of Object.entries(patterns)) {
            if (pattern.test(cardNumber)) {
                return cardType as CardType;
            }
        }

        return 'unknown';
    }

    formatCardExpiryDate(expiryDate: string) {
        if (expiryDate.length === 0) return '';

        let month = '';
        let year = '';

        const firstDigit = expiryDate.charAt(0);
        const isZeroOrOne = firstDigit === '0' || firstDigit === '1';
        const dontFormat = isZeroOrOne && expiryDate.length === 1;

        if (dontFormat) return expiryDate;

        if (!isZeroOrOne) {
            month += `0${firstDigit}`;
            year += expiryDate.slice(1);
        } else {
            month += expiryDate.slice(0, 2);
            year += expiryDate.slice(2);
        }

        return `${month}/${year}`;
    }

    isDefaultPagination(param: string, value: any) {
        return (param === 'start' && value === 1) || (param === 'limit' && value === 10);
    }

    customizeGridColumns(columns: (GridColDef & { mobileWidth?: number })[], numbered?: boolean): GridColDef[] {
        const { isDesktop, isMiniTablet, isMobile, isTablet } = useResponsiveness();

        function getColumnDimensions(mobileWidth: number | undefined, width: number | undefined) {
            if (isDesktop) return { flex: 1 };
            if (width) return { width };
            if ((isMobile || isMiniTablet || isTablet) && mobileWidth) return { width: mobileWidth };
            return { flex: 1 };
        }

        return [
            ...(numbered ? [{ field: 'no', headerName: 'No.', width: 50, sortable: false }] : []),
            ...columns.map(({ mobileWidth, width, ...rest }) => {
                return {
                    ...rest,
                    ...getColumnDimensions(mobileWidth, width),
                };
            }),
        ];
    }

    getIndexedRows(rows?: GridRowModel[]) {
        return rows?.map((row, index) => ({ no: String(index + 1).padStart(2, '0') + '.', ...row }));
    }

    mutateOptions<TData>({
        successCallback,
        successAsyncCallback,
        errorCallback,
        setLoading,
    }: MutateOptionsProps<TData>) {
        //This function is fully customizable, and fuly depends on the structure of your API response structure.
        //Make sure to edit it to meet your API response structure.
        //TData here is the structure of the response body. If you want to edit it, refer to APIResponse interface under the api > types folder.
        //Refer to the readme for more information about this function.

        const success = (response: APIResponse<TData>) => {
            const { statusCode, responseMessage } = response;

            if (statusCode === 200) {
                snackbarToast.success(responseMessage);
                successCallback?.(response);
                setLoading?.(false);
            } else {
                snackbarToast.error(responseMessage);
                errorCallback?.(response);
                setLoading?.(false);
            }
        };

        const successAsync = async (response: APIResponse<TData>) => {
            const { statusCode, responseMessage } = response;

            if (statusCode === 200) {
                snackbarToast.success(responseMessage);
                await successAsyncCallback?.(response);
                setLoading?.(false);
            } else {
                snackbarToast.error(responseMessage);
                errorCallback?.(response);
                setLoading?.(false);
            }
        };

        return {
            onSuccess: typeof successAsyncCallback == 'function' ? successAsync : success,
            onError(error: any) {
                snackbarToast.error('Something went wrong!');
                setLoading?.(false);
            },
        };
    }
};

const utils = new Utilities();

export default utils;

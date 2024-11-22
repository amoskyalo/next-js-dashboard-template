import dynamic from 'next/dynamic';

export * from './TextFieldInput';
export * from './FileUpload';
export * from './OTPField';
export * from './PaymentCardInput';
export * from './AutocompleteField';
export * from './SelectFieldInput';
export * from './CheckboxInputField';
export * from './GroupedCheckboxInputField';
export * from './DataGridSearchInput';

export const PhoneNumberInput = dynamic(() => import('./PhoneNumberInput'), { ssr: false });
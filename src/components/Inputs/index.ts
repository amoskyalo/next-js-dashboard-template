import dynamic from 'next/dynamic';

export * from './TextFieldInput';
export * from './FileUpload';
export * from './OTPField';
export * from './PaymentCardInput';

export const PhoneNumberInput = dynamic(() => import('./PhoneNumberInput'), { ssr: false });
import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { CheckboxInputProps } from './types';

export const CheckboxInputField = ({ label, ...rest }: CheckboxInputProps) => {
    return <FormControlLabel control={<Checkbox {...rest} />} label={label} />;
};

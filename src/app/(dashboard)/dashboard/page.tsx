'use client';

import { OTPField, PaymentCardInput, AutocompleteField, SelectFieldInput, CheckboxInputField, GroupedCheckboxInputField } from '@/components/Inputs';
import { Box } from '@mui/material';
import { useState } from 'react';

const Dashboard = () => {
    const [value, setValue] = useState<string[]>([]);
    console.log(value);
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ width: 350 }}>
                <GroupedCheckboxInputField
                    options={[
                        { name: 'Javascript', value: 'js' },
                        { name: 'Typescript', value: 'ts' },
                        { name: 'Python', value: 'py' },
                        { name: 'Java', value: 'java' },
                    ]}
                    label="Select one language"
                    error
                    helperText="This field is required"
                    onChange={(__, newValue) => {
                        setValue(newValue);
                    }}
                    value={value}
                    multiple
                />
            </Box>
        </Box>
    );
};

export default Dashboard;

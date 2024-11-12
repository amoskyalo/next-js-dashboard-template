import { Autocomplete, TextField, InputLabel, Stack } from '@mui/material';
import { AutocompleteFieldProps } from './types';

export const AutocompleteField = ({ label, error, helperText, size, placeholder, ...props }: AutocompleteFieldProps) => {
    return (
        <Stack>
            <InputLabel>{label}</InputLabel>
            <Autocomplete
                {...props}
                fullWidth
                size={size ?? 'small'}
                renderInput={(params) => <TextField error={error} helperText={helperText} {...params} placeholder={placeholder} />}
            />
        </Stack>
    );
};

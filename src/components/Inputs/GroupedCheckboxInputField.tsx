import { FormGroup, FormLabel, FormHelperText, FormControl } from '@mui/material';
import { GroupedCheckboxInputProps } from './types';
import { CheckboxInputField } from './CheckboxInputField';

export const GroupedCheckboxInputField = ({ error, label, options, helperText, onChange, multiple, value }: GroupedCheckboxInputProps) => {
    return (
        <FormControl error={error} component="fieldset" variant="standard">
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {options.map(({ name, value: optionValue }) => (
                    <CheckboxInputField
                        key={name}
                        label={name}
                        checked={multiple ? value.includes(optionValue) : value === optionValue}
                        onChange={(event) => {
                            const isChecked = event.target.checked;
                            const newValue = isChecked ? optionValue : '';
                            const onChangeValue = multiple ? [...value, newValue] : newValue;
                            onChange?.(event, onChangeValue);
                        }}
                    />
                ))}
            </FormGroup>
            {error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

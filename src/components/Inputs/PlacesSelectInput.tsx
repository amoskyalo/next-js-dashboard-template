'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import { Box, TextField, Autocomplete, Typography, Stack, InputLabel } from '@mui/material';
import { debounce } from '@mui/material/utils';
import { PlacesSelectInputProps, PlaceType } from './types';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function loadScript(src: string, position: HTMLElement | null, id: string) {
    if (!position) {
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}

const autocompleteService = { current: null };

export const PlacesSelectInput = ({
    label,
    onChange,
    placeholder,
    helperText,
    error,
    defaultValue,
}: PlacesSelectInputProps) => {
    const [value, setValue] = useState<string | null>('');
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<readonly string[]>([]);

    const loaded = useRef(false);

    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
                document.querySelector('head'),
                'google-maps',
            );
        }

        loaded.current = true;
    }

    const fetch = useMemo(
        () =>
            debounce((request: { input: string }, callback: (results?: readonly PlaceType[]) => void) => {
                (autocompleteService.current as any).getPlacePredictions(request, callback);
            }, 400),
        [],
    );

    useEffect(() => {
        let active = true;

        if (!autocompleteService.current && (window as any).google) {
            autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
        }

        if (!autocompleteService.current) {
            return undefined;
        }

        if (defaultValue) {
            setValue(defaultValue);
        }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
            if (active) {
                let newOptions: readonly string[] = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    const mappedResults = results.map((result) => result.description);
                    newOptions = [...newOptions, ...mappedResults];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch, defaultValue]);

    return (
        <Stack>
            <InputLabel>{label}</InputLabel>
            <Autocomplete
                filterOptions={(x) => x}
                size="small"
                options={options}
                autoComplete
                fullWidth
                includeInputInList
                filterSelectedOptions
                value={value}
                noOptionsText="No suggestions"
                onChange={(event: any, newValue: string | null) => {
                    setOptions(newValue ? [newValue, ...options] : options);
                    setValue(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    onChange?.(newInputValue);
                }}
                renderInput={(params) => (
                    <TextField error={error} helperText={helperText} placeholder={placeholder} {...params} />
                )}
                renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                        <li key={key} {...optionProps}>
                            <Box
                                sx={{
                                    maxWidth: '100%',
                                    width: '100%',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                                    {option}
                                </Typography>
                            </Box>
                        </li>
                    );
                }}
            />
        </Stack>
    );
};

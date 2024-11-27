'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import { Box, TextField, Autocomplete, Typography, Stack, InputLabel } from '@mui/material';
import { debounce } from '@mui/material/utils';
import { PlacesSelectInputProps, PlaceType } from './types';
import parse from 'autosuggest-highlight/parse';

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

export const PlacesSelectInput = ({ label, onChange, placeholder, helperText, error }: PlacesSelectInputProps) => {
    const [value, setValue] = useState<PlaceType | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<readonly PlaceType[]>([]);
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

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
            if (active) {
                let newOptions: readonly PlaceType[] = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <Stack>
            <InputLabel>{label}</InputLabel>
            <Autocomplete
                getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
                filterOptions={(x) => x}
                size="small"
                options={options}
                autoComplete
                fullWidth
                includeInputInList
                filterSelectedOptions
                value={value}
                noOptionsText="No suggestions"
                onChange={(event: any, newValue: PlaceType | null) => {
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
                    const matches = option.structured_formatting.main_text_matched_substrings || [];

                    const parts = parse(
                        option.structured_formatting.main_text,
                        matches.map((match: any) => [match.offset, match.offset + match.length]),
                    );

                    return (
                        <li key={key} {...optionProps}>
                            <Stack direction={'column'} sx={{ width: '100%' }}>
                                <Box
                                    sx={{
                                        maxWidth: '100%',
                                        width: '100%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {parts.map((part, index) => (
                                        <Typography
                                            variant="body2"
                                            key={index}
                                            component="span"
                                            sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                                        >
                                            {part.text}
                                        </Typography>
                                    ))}
                                </Box>

                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    {option.structured_formatting.secondary_text}
                                </Typography>
                            </Stack>
                        </li>
                    );
                }}
            />
        </Stack>
    );
};

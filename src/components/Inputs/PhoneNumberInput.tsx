import { useState, useContext, useMemo, useEffect } from 'react';
import {
    TextField,
    Stack,
    InputLabel,
    InputAdornment,
    Menu,
    MenuItem,
    MenuList,
    Box,
    Divider,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { CountriesContext } from '@/context';
import { useLocalStorageState } from '@toolpad/core';
import { PhoneNumberInputProps, Country } from './types';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const PhoneNumberInput = ({ label, size, poperWidth, onChange, colorIndex, ...rest }: PhoneNumberInputProps) => {
    const [country, setCountry] = useState<Country | null>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [search, setSearch] = useState<string | null>(null);

    const [themeMode] = useLocalStorageState('toolpad-mode');
    const { countries, countryCode, setCountryCode } = useContext(CountriesContext);

    useEffect(() => {
        if (country) {
            setCountryCode(country.code);
        }
    }, [country]);

    const defaultCountry = useMemo(() => {
        return countries?.find((entry: Country) => {
            const code = entry.code;
            return countryCode === code;
        });
    }, [countries, countryCode]);

    const countryOptions = useMemo(() => {
        return countries?.filter((entry: { code: string; label: string; phone: string }) =>
            entry.label.toLowerCase().includes(search?.toLowerCase() ?? ''),
        );
    }, [countries, search]);

    const defaultCallingCode = defaultCountry.phone;

    const handleCountryChange = (country: Country) => {
        setCountry(country);
        setAnchorEl(null);
        setSearch(null);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.({
            event,
            phone: country?.phone ?? defaultCallingCode,
            code: country?.code ?? countryCode,
            value: event.target.value,
        });
    };

    const inputSize = size ?? 'small';
    const adornmentSize = inputSize === 'small' ? '40px' : '56px';
    const paddingLeft = inputSize === 'small' ? 1.5 : 2.5;
    const paddingRight = inputSize === 'small' ? 0.5 : 1.5;
    const themedColorIndex = themeMode === 'dark' ? 800 : 200;

    return (
        <Stack spacing={0.5} sx={{ width: '100%' }}>
            <InputLabel sx={{ fontSize: 14 }}>{label}</InputLabel>
            <TextField
                fullWidth
                size={inputSize}
                onChange={handleChange}
                type="tel"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <Stack
                                    direction="row"
                                    alignItems={'center'}
                                    onClick={(e) => setAnchorEl(e.currentTarget)}
                                >
                                    <Stack
                                        direction="row"
                                        alignItems={'center'}
                                        sx={{
                                            backgroundColor: grey[colorIndex ?? themedColorIndex],
                                            height: adornmentSize,
                                            paddingLeft,
                                            paddingRight,
                                            marginRight: 1,
                                            cursor: 'pointer',
                                            borderRadius: 1,
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                        }}
                                    >
                                        <Image
                                            src={`https://flagcdn.com/w20/${country?.code.toLowerCase() ?? defaultCountry.code.toLowerCase()}.png`}
                                            alt={country?.label ?? defaultCountry.label}
                                            width={25}
                                            height={15}
                                            priority
                                        />
                                        <KeyboardArrowDownIcon fontSize="small" />
                                    </Stack>
                                    {country?.phone ?? defaultCallingCode}
                                </Stack>
                            </InputAdornment>
                        ),
                        style: {
                            paddingLeft: '0px',
                        },
                    },
                }}
                {...rest}
            />

            <Menu
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                open={Boolean(anchorEl)}
                sx={{
                    '& .MuiPaper-root': {
                        marginTop: 1,
                        width: poperWidth ?? 400,
                        maxHeight: 250,
                    },
                }}
            >
                <Box sx={{ px: 2, py: 0.5 }}>
                    <TextField
                        placeholder="Search country..."
                        variant="standard"
                        slotProps={{ input: { disableUnderline: true, startAdornment: <SearchIcon /> } }}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Box>

                <Divider />

                <MenuList>
                    {countryOptions?.map((country: any) => (
                        <MenuItem
                            key={country.label}
                            onClick={() =>
                                handleCountryChange({
                                    label: country.label,
                                    phone: country.phone,
                                    code: country.code,
                                })
                            }
                        >
                            <ListItemIcon>
                                <Image
                                    src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                    alt={country.label}
                                    width={25}
                                    height={15}
                                    priority
                                />
                            </ListItemIcon>
                            <ListItemText>
                                {country.label} ( {country.phone} )
                            </ListItemText>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Stack>
    );
};

export default PhoneNumberInput;

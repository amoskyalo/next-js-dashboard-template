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
    CircularProgress,
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
    const { countries, isLoading, countryCode, setCountryCode } = useContext(CountriesContext);

    useEffect(() => {
        if (country) {
            setCountryCode(country.codeName);
        }
    }, [country]);

    const defaultCountry = useMemo(() => {
        return countries?.find((entry: any) => {
            const code = entry.cca2;
            return countryCode === code;
        });
    }, [countries, countryCode]);

    const countryOptions = useMemo(() => {
        return countries?.filter((entry: any) => entry.name.common.toLowerCase().includes(search?.toLowerCase() ?? ''));
    }, [countries, search]);

    const defaultCallingCode = defaultCountry?.idd.root + defaultCountry?.idd.suffixes[0];

    const handleCountryChange = (country: Country) => {
        setAnchorEl(null);
        setCountry(country);
        setSearch(null);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.({
            event,
            callingCode: country?.callingCode ?? defaultCallingCode,
            countryCode: country?.codeName ?? countryCode,
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
                                <Stack direction="row" alignItems={'center'} onClick={(e) => setAnchorEl(e.currentTarget)}>
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
                                            src={country?.flag ?? defaultCountry?.flags.png}
                                            alt={country?.name ?? defaultCountry?.name}
                                            width={25}
                                            height={15}
                                            priority
                                        />
                                        <KeyboardArrowDownIcon fontSize="small" />
                                    </Stack>
                                    {country?.callingCode ?? defaultCallingCode}
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

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 2 }}>
                        <CircularProgress size={28} />
                    </Box>
                ) : (
                    <MenuList>
                        {countryOptions?.map((country: any) => (
                            <MenuItem
                                key={country.name.common}
                                onClick={() =>
                                    handleCountryChange({
                                        name: country.name.common,
                                        flag: country.flags.png,
                                        callingCode: country.idd.root + country.idd.suffixes[0],
                                        codeName: country.cca2,
                                    })
                                }
                            >
                                <ListItemIcon>
                                    <Image src={country.flags.png} alt={country.name.common} width={25} height={15} priority/>
                                </ListItemIcon>
                                <ListItemText>
                                    {country.name.common} ( {country.idd.root + country.idd.suffixes[0]} )
                                </ListItemText>
                            </MenuItem>
                        ))}
                    </MenuList>
                )}
            </Menu>
        </Stack>
    );
};

export default PhoneNumberInput;

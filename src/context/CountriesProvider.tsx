'use client';

import { createContext, useMemo, useState } from 'react';
import { CountryCode } from 'libphonenumber-js';
import { countries } from '@/_localDb';

export const CountriesContext = createContext<any>(null);

export const CountriesProvider = ({ children }: { children: React.ReactNode }) => {
    const [countryCode, setCountryCode] = useState<CountryCode>('KE');

    const value = useMemo(() => {
        return {
            countries,
            countryCode,
            setCountryCode,
        };
    }, [countries, countryCode]);

    return <CountriesContext.Provider value={value}>{children}</CountriesContext.Provider>;
};

'use client';

import { createContext, useMemo, useState } from 'react';
import { useFetchCountries } from '@/hooks';
import { CountryCode } from 'libphonenumber-js';

export const CountriesContext = createContext<any>(null);

export const CountriesProvider = ({ children }: { children: React.ReactNode }) => {
    const [countryCode, setCountryCode] = useState<CountryCode>('KE');
    const { data, isLoading } = useFetchCountries();

    const countries = useMemo(() => {
        return data?.filter((entry: any) => entry.idd.suffixes !== undefined);
    }, [data]);

    const value = useMemo(() => {
        return {
            countries,
            isLoading,
            countryCode,
            setCountryCode,
        };
    }, [countries, isLoading, countryCode]);

    return <CountriesContext.Provider value={value}>{children}</CountriesContext.Provider>;
};

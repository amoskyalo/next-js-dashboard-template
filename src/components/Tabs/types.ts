import { ChipProps, SxProps } from '@mui/material';

export type ChipTabsProps = ChipProps & {
    tabsList: string[];
    onClick: (tab: string) => void;
    getChipColor?: (tab: string) => 'primary' | 'secondary' | 'error' | 'success' | 'default';
    getChipVariant?: (tab: string) => 'filled' | 'outlined';
    getChipStyles?: (tab: string) => SxProps;
};

import { useResponsiveness } from '@/hooks';
import { Tabs, Chip, Box, Tab } from '@mui/material';
import { ChipTabsProps } from './types';

const ChipTabs = ({ tabsList, onClick, getChipColor, getChipVariant, getChipStyles, ...rest }: ChipTabsProps) => {
    const { isMobile } = useResponsiveness();

    return (
        <Tabs variant="scrollable" scrollButtons={isMobile} allowScrollButtonsMobile={isMobile}>
            <Box sx={{ mt: 0.8, display: 'flex', columnGap: 1 }}>
                {tabsList.map((tab, index) => (
                    <Tab
                        key={tab}
                        component={() => {
                            return (
                                <Chip
                                    label={tab}
                                    onClick={() => onClick(tab)}
                                    color={getChipColor?.(tab) ?? 'default'}
                                    variant={getChipVariant?.(tab) ?? 'outlined'}
                                    sx={getChipStyles?.(tab)}
                                />
                            );
                        }}
                    />
                ))}
            </Box>
        </Tabs>
    );
};

export default ChipTabs;

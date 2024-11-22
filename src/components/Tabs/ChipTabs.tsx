import { useResponsiveness } from '@/hooks';
import { Tabs, Chip, Box, Tab } from '@mui/material';
import { ChipTabsProps } from './types';

const ChipTabs = ({ tabsList, onClick }: ChipTabsProps) => {
    const { isMobile } = useResponsiveness();

    return (
        <Tabs variant="scrollable" scrollButtons allowScrollButtonsMobile>
            <Box sx={{ mt: 0.8, display: 'flex', columnGap: 1 }}>
                {tabsList.map((tab, index) => (
                    <Tab
                        key={tab}
                        component={() => {
                            return <Chip label={tab} onClick={() => onClick(tab)} color={index === 0 ? 'primary' : 'default'} />;
                        }}
                    />
                ))}
            </Box>
        </Tabs>
    );
};

export default ChipTabs;

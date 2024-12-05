import { Pagination, Box, Divider, Stack, Typography, MenuList, MenuItem, Menu } from '@mui/material';
import { useResponsiveness, useSetSearchParams } from '@/hooks';
import { useEffect, useState } from 'react';
import { DataGridFooterProps } from './types';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const DataGridFooter = (props: DataGridFooterProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const { loading, count } = props;
    const { isMobile } = useResponsiveness();
    const { setParams, getParam } = useSetSearchParams();

    const limit = parseInt(getParam('limit') ?? '10');
    const start = parseInt(getParam('start') ?? '1');

    useEffect(() => {
        if (start && count && start > count) {
            setParams({ start: 1 });
        }
    }, [start, count]);

    return (
        <Box>
            <Divider />
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={5} sx={{ p: 2 }}>
                {!isMobile && (
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="body1">Rows per page:</Typography>
                        <Stack
                            direction="row"
                            alignItems="center"
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                            sx={{ cursor: 'pointer' }}
                        >
                            <Typography variant="body1">{limit}</Typography>
                            <ArrowDropDownIcon fontSize="medium" />
                        </Stack>
                    </Stack>
                )}

                <Pagination
                    variant="outlined"
                    shape="rounded"
                    disabled={loading}
                    onChange={(_, page) => setParams({ start: page })}
                    page={start}
                    defaultPage={1}
                    count={count}
                />
            </Stack>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <MenuList>
                    {[10, 25, 50, 75, 100].map((size) => (
                        <MenuItem onClick={() => setParams({ limit: size })} key={size}>
                            {size}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Box>
    );
};

export default DataGridFooter;

'use client';

import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { GridProps } from './types';
import DataGridToolbar from './DataGridToolbar';
import DataGridFooter from './DataGridFooter';

declare module '@mui/x-data-grid' {
    interface ToolbarPropsOverrides {
        onAdd?: () => void;
    }
}

const AppGrid = (props: GridProps) => {
    const { onAdd, getRowId, loading, checkboxSelection = true, ...otherProps } = props;

    const footer = () => <DataGridFooter loading={loading} count={10} />;

    return (
        <Box sx={{ borderRadius: 2 }}>
            <DataGrid
                disableRowSelectionOnClick
                disableColumnMenu={true}
                loading={loading}
                getRowId={getRowId || ((row) => row.id)}
                checkboxSelection={checkboxSelection}
                getRowClassName={({ indexRelativeToCurrentPage }) =>
                    indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'
                }
                slots={{ footer, toolbar: DataGridToolbar }}
                slotProps={{
                    toolbar: {
                        onAdd,
                        showQuickFilter: true,
                    },
                }}
                sx={{
                    '&>.MuiDataGrid-main': {
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: '600',
                        },
                        '& .MuiDataGrid-columnHeader:focus': {
                            outline: 'none',
                            border: 'none',
                        },
                        '& .MuiDataGrid-columnHeader:focus-within': {
                            outline: 'none !important',
                        },
                        '& .MuiDataGrid-row': {
                            borderBottom: '1px #272e36',
                        },
                    },
                    '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                        outline: 'none !important',
                    },
                    borderColor: 'transparent',
                }}
                {...otherProps}
            />
        </Box>
    );
};

export default AppGrid;

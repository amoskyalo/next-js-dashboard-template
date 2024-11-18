import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Button, IconButton, Tooltip } from '@mui/material';
import { DataGridSearchInput } from '../Inputs';
import { DataGridToolbarProps } from './types';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

const DataGridToolbar = ({ onAdd }: Readonly<DataGridToolbarProps>) => {
    return (
        <GridToolbarContainer
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                borderBottom: 1,
                borderColor: 'divider',
                padding: '8px',
            }}
        >
            <Tooltip title="filters">
                <IconButton size="small">
                    <FilterListIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            <DataGridSearchInput />
            <GridToolbarExport />
            <Button startIcon={<AddIcon />} disableElevation size="small" variant="contained" onClick={onAdd}>
                New
            </Button>
        </GridToolbarContainer>
    );
};

export default DataGridToolbar;

import {
    PaymentCardInput,
    AutocompleteField,
    TextFieldInput,
    SelectFieldInput,
    PhoneNumberInput,
    OTPField,
    GroupedCheckboxInputField,
    CheckboxInputField,
} from '@/components/Inputs';
import { Box, Button, Grid2, MenuItem, Stack, Typography } from '@mui/material';
import { AppGrid, DataGridActions } from '@/components/DataGrid';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { DeleteDialog, WithHeaderDialog } from '@/components/Dialogs';
import { ChipTabs } from '@/components/Tabs';
import { LineChart } from '@/components/Charts';
import utils from '@/utils';
const selectOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

const rows = [
    { id: 1, name: 'John Doe', role: 'Admin', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', role: 'Editor', email: 'jane.smith@example.com' },
    { id: 3, name: 'Bob Johnson', role: 'Viewer', email: 'bob.johnson@example.com' },
    { id: 4, name: 'Alice Brown', role: 'Admin', email: 'alice.brown@example.com' },
    { id: 5, name: 'Charlie Davis', role: 'Editor', email: 'charlie.davis@example.com' },
];

export const _db = () => {
    const [dialog, setDialog] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const onAction = () => {
        setDeleteOpen(true);
    };

    const onDeleteDialogActions = () => {
        setDeleteOpen(false);
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'role', headerName: 'Role', width: 120 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 100,
            getActions: ({ id, row }) => [<DataGridActions key="actions" onDelete={onAction} onEdit={onAction} />],
        },
    ];

    const list = [
        {
            name: 'Components Usage',
            list: [
                {
                    title: 'Input Fields',
                    component: () => {
                        return (
                            <Grid2 container rowSpacing={3} columnSpacing={6}>
                                <Grid2 size={6}>
                                    <AutocompleteField
                                        options={selectOptions}
                                        label="Autocomplete field"
                                        multiple
                                        placeholder="Select an option"
                                    />
                                </Grid2>
                                <Grid2 size={6}>
                                    <TextFieldInput label="TextField Input" placeholder="Enter value" />
                                </Grid2>
                                <Grid2 size={6}>
                                    <SelectFieldInput label="Select Field Input" placeholder="Enter value">
                                        {selectOptions.map((option) => (
                                            <MenuItem value={option} key={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </SelectFieldInput>
                                </Grid2>
                                <Grid2 size={6}>
                                    <PhoneNumberInput
                                        label="Phone Number Input"
                                        placeholder="Enter your phone number"
                                    />
                                </Grid2>
                                <Grid2 size={6}>
                                    <PaymentCardInput label="Enter card information" />
                                </Grid2>
                                <Grid2 size={12}>
                                    <OTPField label="OTP Input" />
                                </Grid2>
                                <Grid2 size={12}>
                                    <GroupedCheckboxInputField
                                        label="Multiple Checkbox Select"
                                        options={[
                                            { name: 'Joy UI', value: 'joy ui' },
                                            { name: 'Base UI', value: 'base ui' },
                                        ]}
                                    />
                                </Grid2>
                                <Grid2 size={12}>
                                    <CheckboxInputField label="Single Checkbox" />
                                </Grid2>
                            </Grid2>
                        );
                    },
                },
                {
                    title: 'Data Grid',
                    component: () => (
                        <>
                            <AppGrid
                                columns={utils.customizeGridColumns(columns)}
                                rows={utils.getIndexedRows(rows)}
                                getRowId={(row) => row.id}
                            />

                            <DeleteDialog
                                open={deleteOpen}
                                loading={false}
                                onCancel={onDeleteDialogActions}
                                onOkay={onDeleteDialogActions}
                            />
                        </>
                    ),
                },
                {
                    title: 'Dialogs',
                    component: () => (
                        <>
                            <Stack direction={'row'} spacing={3}>
                                <Button variant="contained" onClick={onAction}>
                                    Open Delete Dialog
                                </Button>
                                <Button variant="outlined" onClick={() => setDialog(true)}>
                                    Open With Header Dialog
                                </Button>
                            </Stack>

                            <WithHeaderDialog
                                open={dialog}
                                dialogTitle="This dialog has header"
                                onCancel={() => setDialog(false)}
                            >
                                Hello world!
                            </WithHeaderDialog>
                        </>
                    ),
                },
                {
                    title: 'Tabs',
                    component: () => (
                        <Box sx={{ width: '60%' }}>
                            <Typography variant="subtitle2">Responsive Chip Tabs</Typography>
                            <ChipTabs
                                tabsList={['MUI', 'Base UI', 'Joy UI', 'Styled', 'Toolpad', 'Toolpad Studio']}
                                onClick={() => {}}
                            />
                        </Box>
                    ),
                },
                {
                    title: 'Charts',
                    component: () => (
                        <Stack>
                            <Box>
                                <Typography variant="subtitle2">Line chart</Typography>
                                <LineChart />
                            </Box>
                        </Stack>
                    ),
                },
            ],
        },
        {
            name: 'Hooks',
            list: [],
        }
    ];

    return {
        list,
    };
};

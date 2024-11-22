import { DataGridProps } from '@mui/x-data-grid';
import { PaginationProps } from '@mui/material';

export type DataGridToolbarProps = {
    onAdd?: () => void;
};

export type DataGridFooterProps = PaginationProps & {
    loading: boolean | undefined;
    pageSize?: number;
};

export type DataGridRowEditActionsProps = {
    id: string | number;
    isEditMode: boolean;
    handleSaveClick: (arg: string | number) => void;
    handleCancelClick: (arg: string | number) => void;
    handleEditClick: (arg: string | number) => void;
    handleDeleteClick: (arg: string | number) => void;
};

export type DataGridActionsProps = {
    actions?: Array<'edit' | 'delete' | 'options'>;
    onEdit?: () => void;
    onDelete?: () => void;
    onOptions?: (args: any) => void;
};

export type GridProps = DataGridProps & DataGridToolbarProps;

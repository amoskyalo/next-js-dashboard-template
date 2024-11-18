import { GridActionsCellItem } from '@mui/x-data-grid';
import { DataGridActionsProps } from './types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const DataGridActions = ({ onEdit, onDelete, onOptions, actions = ['edit', 'delete'] }: DataGridActionsProps) => {
    const actionComponents: {
        name: 'edit' | 'delete' | 'options';
        component: () => JSX.Element;
    }[] = [
        {
            name: 'edit' as const,
            component: () => (
                <GridActionsCellItem key="edit" label="Edit" color="success" icon={<EditIcon />} onClick={onEdit} />
            ),
        },
        {
            name: 'delete' as const,
            component: () => (
                <GridActionsCellItem
                    key="delete"
                    label="Delete"
                    color="error"
                    icon={<DeleteIcon />}
                    onClick={onDelete}
                />
            ),
        },
        {
            name: 'options' as const,
            component: () => (
                <GridActionsCellItem
                    key="options"
                    label="options"
                    color="primary"
                    icon={<MoreVertIcon />}
                    onClick={onOptions}
                />
            ),
        },
    ].filter(({ name }) => actions.includes(name));

    return actionComponents.map(({ component }) => component());
};

export default DataGridActions;

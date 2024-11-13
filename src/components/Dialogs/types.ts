export type DeleteDialogProps = {
    open: boolean;
    loading: boolean;
    dialogTitle?: string;
    contentText?: string;
    onOkayButtonText?: string;
    onCancelButtonText?: string;
    onCancel: () => void;
    onOkay: () => void;
};

export type WithHeaderDialogProps = {
    open: boolean;
    dialogTitle: string;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    children: React.ReactNode;
    onCancel: () => void;
};

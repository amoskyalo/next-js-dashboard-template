import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Stack, Tooltip } from '@mui/material';
import { WithHeaderDialogProps } from './types';
import CloseIcon from '@mui/icons-material/Close';

const WithHeaderDialog = (props: WithHeaderDialogProps) => {
    const { open, dialogTitle, onCancel, maxWidth, children } = props;

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth={maxWidth ?? 'xs'}
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {dialogTitle}
                    </Typography>
                    <Tooltip title="Close">
                    <IconButton onClick={onCancel}>
                        <CloseIcon />
                    </IconButton>
                    </Tooltip>
                </Stack>
            </DialogTitle>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
};

export default WithHeaderDialog;

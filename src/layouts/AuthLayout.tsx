import { Stack, Box } from '@mui/material';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Stack
            direction={'row'}
            justifyItems={'center'}
            alignItems={'center'}
            sx={{ height: '100dvh', width: '100%', overflow: 'hidden' }}
            className="login"
        >
            <Box sx={{ height: '100%', overflowY: 'auto', width: '100%' }}>{children}</Box>
        </Stack>
    );
};

export default AuthLayout;

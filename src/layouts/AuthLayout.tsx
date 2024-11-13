import { Grid2 as Grid, Box } from '@mui/material';
import { useResponsiveness } from '@/hooks';
import Image from 'next/image';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const { isTablet } = useResponsiveness();

    return (
        <Grid container sx={{ height: '100dvh', width: '100%', overflow: 'hidden' }}>
            <Grid size={isTablet ? 12 : 4}>
                <Box sx={{ height: '100%', width: '100%' }}>{children}</Box>
            </Grid>

            <Grid
                size={8}
                sx={{
                    height: '100%',
                    display: {
                        xs: 'none',
                        sm: 'none',
                        md: 'none',
                        lg: 'block',
                    },
                }}
            >
                <Image src="/assets/images/login.jpg" alt="login" height={1440} width={1440} className="login-cover" priority />
            </Grid>
        </Grid>
    );
};

export default AuthLayout;

import { Grid2 as Grid } from '@mui/material';
import { useResponsiveness } from '@/hooks';
import Image from 'next/image';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const { isMobile } = useResponsiveness();

    return (
        <Grid container sx={{ height: '100dvh', width: '100%', overflow: 'hidden' }}>
            <Grid size={isMobile ? 12 : 4} sx={{ height: '100%', width: '100%' }}>
                {children}
            </Grid>

            <Grid
                size={8}
                sx={{
                    height: '100%',
                    display: {
                        xs: 'none',
                        sm: 'none',
                        md: 'block',
                    },
                }}
            >
                <Image src="/assets/images/login.jpg" alt="login" height={1440} width={1440} className="login-cover" priority />
            </Grid>
        </Grid>
    );
};

export default AuthLayout;

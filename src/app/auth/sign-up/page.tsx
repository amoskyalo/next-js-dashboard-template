'use client';

import { Box, Typography } from '@mui/material';

const SignUp = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                border: '1px solid red',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography variant="h1">Sign Up</Typography>
        </Box>
    );
};

export default SignUp;

'use client';

import { OTPField, PaymentCardInput } from '@/components/Inputs';
import { Box } from '@mui/material';

const Dashboard = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ width: 350 }}>
                {/* <OTPField label="OTP Field" size="medium" /> */}
                <PaymentCardInput onChange={(e) => console.log(e)} />
            </Box>
        </Box>
    );
};

export default Dashboard;

'use client';

import { setCookie } from 'cookies-next';
import { Button, Stack, Box, Typography, Link, FormControlLabel, Checkbox } from '@mui/material';
import { useRouter } from 'next/navigation';
import { grey } from '@mui/material/colors';
import { TextFieldInput, PhoneNumberInput } from '@/components/Inputs';
import { Formik, Form } from 'formik';
import { useResponsiveness } from '@/hooks';
import { useContext } from 'react';
import { CountriesContext } from '@/context';
import utils from '@/utils';

type LoginFormValues = {
    email: string;
    phoneNumber: string;
    password: string;
};

const Login = () => {
    const { isMobile } = useResponsiveness();
    const { countryCode } = useContext(CountriesContext);
    const router = useRouter();

    const validationSchema = utils.getValidationSchema(
        [
            { type: 'email', name: 'email' },
            { type: 'password', name: 'password' },
            { type: 'phone_number', name: 'phoneNumber' },
        ],
        countryCode,
    );

    const handleLogin = (values: LoginFormValues) => {
        setCookie('user', values);
        router.push('/dashboard');
    };

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems={isMobile ? 'normal' : 'center'}
            paddingX={isMobile ? 4 : 0}
            height="100%"
            spacing={4}
        >
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Welcome Back
                </Typography>
                <Typography variant="subtitle1" sx={{ color: grey[700] }}>
                    Sign in to your account to continue.
                </Typography>
            </Box>

            <Formik
                initialValues={{ email: '', phoneNumber: '', password: '' }}
                onSubmit={handleLogin}
                validateOnBlur={false}
                validationSchema={validationSchema}
            >
                {(formik) => {
                    return (
                        <Form>
                            <Stack spacing={2} sx={{ width: isMobile ? '100%' : '350px' }}>
                                <TextFieldInput
                                    name="email"
                                    placeholder="Email"
                                    label="Email"
                                    {...utils.getFormikFieldProps({ formik, field: 'email' })}
                                />

                                <PhoneNumberInput
                                    name="phoneNumber"
                                    placeholder="Phone number"
                                    label="Phone number"
                                    colorIndex={200}
                                    poperWidth={350}
                                    {...utils.getFormikFieldProps({ formik, field: 'phoneNumber', isPhoneNumber: true })}
                                />

                                <TextFieldInput
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    label="Password"
                                    {...utils.getFormikFieldProps({ formik, field: 'password' })}
                                />

                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    <FormControlLabel
                                        sx={{
                                            '& .MuiFormControlLabel-label': {
                                                fontSize: 14,
                                                color: grey[600],
                                            },
                                        }}
                                        control={<Checkbox size="small" defaultChecked />}
                                        label="Remember me"
                                    />
                                    <Link underline="none" sx={{ fontSize: 14, fontWeight: 700 }} href="/forgot-password">
                                        Forgot password?
                                    </Link>
                                </Stack>

                                <Button variant="contained" fullWidth type="submit" sx={{ textTransform: 'none' }} disableElevation>
                                    Sign In
                                </Button>

                                <Typography variant="caption" sx={{ color: grey[600], textAlign: 'center' }}>
                                    Don't have an account?
                                    <Link underline="hover" href="/auth/sign-up">
                                        Register
                                    </Link>
                                </Typography>
                            </Stack>
                        </Form>
                    );
                }}
            </Formik>
        </Stack>
    );
};

export default Login;

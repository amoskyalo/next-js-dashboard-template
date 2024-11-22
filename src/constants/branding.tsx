import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const branding = {
    // default branding approach
    default: {
        logo: <Image src={`/assets/images/logo-3.webp`} alt={`logo`} width={20} height={20} priority />,
        title: "Acme",
    },

    // this is for if you want to set-up you logo as a component
    component: (setAnchorEl: (anchorEl: HTMLElement | null) => void, selectedBranch: number) => ({
        logo: (
            <Box
                component="div"
                // need to disable the MUI link 'parent component' from routing to home.
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
                sx={{
                    cursor: 'default',
                    '& a': {
                        pointerEvents: 'none',
                        cursor: 'default',
                    },
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                        height: '100%',
                    }}
                >
                    {["Acme", '/'].map((item) => (
                        <Typography variant="h6" color="primary" fontWeight="bold" key={item}>
                            {item}
                        </Typography>
                    ))}

                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={0.5}
                        sx={{ cursor: 'pointer' }}
                        onClick={(e) => {
                            setAnchorEl(e.currentTarget);
                        }}
                    >
                        <Image src={`/assets/images/logo-${selectedBranch}.webp`} alt={`branch-${selectedBranch}`} width={20} height={20} priority />
                        <Typography variant="h6" color="primary" fontSize={14} fontWeight="600">
                            Team {selectedBranch}
                        </Typography>

                        <Stack>
                            <KeyboardArrowUpIcon sx={{ fontSize: 14 }} />
                            <KeyboardArrowDownIcon sx={{ fontSize: 14, mt: -0.8 }} />
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        ),

        //leave title as empty since we have the name in the logo component
        title: '',
    }),
};

export default branding;

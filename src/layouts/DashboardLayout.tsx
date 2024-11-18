import { useMemo, useState } from 'react';
import { AppProvider } from '@toolpad/core/nextjs';
import { Session } from '@toolpad/core/AppProvider';
import { PageContainer } from '@toolpad/core';
import { DashboardLayout as MUIDashboardLayout } from '@toolpad/core/DashboardLayout';
import { NAVIGATION, theme, branding } from '@/constants';
import { Badge, Box, ListItemIcon, ListItemText, MenuItem, Stack, IconButton } from '@mui/material';
import { ProfileMenu, DefaultMenu } from '@/components/Popover';
import Image from 'next/image';
import NotificationsIcon from '@mui/icons-material/Notifications';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedBranch, setSelectedBranch] = useState<number>(1);

    const [session, setSession] = useState<Session | null>({
        user: {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            image: 'https://avatars.githubusercontent.com/u/91586973',
        },
    });

    const authentication = useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: {
                        name: 'John Doe',
                        email: 'johndoe@gmail.com',
                        image: 'https://avatars.githubusercontent.com/u/91586973',
                    },
                });
            },
            signOut: () => {
                setSession(null);
            },
        };
    }, []);

    const appBranding = branding.component(setAnchorEl, selectedBranch);

    return (
        <AppProvider navigation={NAVIGATION} theme={theme} session={session} authentication={authentication} branding={appBranding}>
            <MUIDashboardLayout
                slotProps={{
                    toolbarAccount: {
                        slots: {
                            popoverContent: ProfileMenu,
                        },
                    },
                }}
                slots={{
                    toolbarActions: () => (
                        <Stack direction="row" alignItems="center">
                            <IconButton>
                                <Badge badgeContent={selectedBranch} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Stack>
                    ),
                }}
            >
                <PageContainer title="" breadcrumbs={[]} maxWidth={false}>
                    <Box>{children}</Box>
                </PageContainer>
            </MUIDashboardLayout>
            <DefaultMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
                {[1, 2, 3].map((item) => (
                    <MenuItem
                        key={item}
                        onClick={() => {
                            setSelectedBranch(item);
                            setAnchorEl(null);
                        }}
                    >
                        <ListItemIcon>
                            <Image src={`/assets/images/logo-${item}.webp`} alt={`branch-${item}`} width={20} height={20} />
                        </ListItemIcon>
                        <ListItemText>Team {item}</ListItemText>
                    </MenuItem>
                ))}
            </DefaultMenu>
        </AppProvider>
    );
};

export default DashboardLayout;

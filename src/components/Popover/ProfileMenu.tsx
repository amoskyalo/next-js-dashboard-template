import { Stack, Divider, MenuItem, MenuList, ListItemIcon, ListItemText } from '@mui/material';
import { AccountPreview } from '@toolpad/core';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';

const ProfileMenu = () => {
    return (
        <Stack direction="column">
            <AccountPreview variant="expanded" />
            <Divider />
            <MenuList>
                <MenuItem>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <HelpOutlineIcon />
                    </ListItemIcon>
                    <ListItemText>Help</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon sx={{ color: 'error' }}>
                        <LogoutIcon color="error" />
                    </ListItemIcon>
                    <ListItemText sx={{ color: 'error.main' }}>Logout</ListItemText>
                </MenuItem>
            </MenuList>
        </Stack>
    );
};

export default ProfileMenu;

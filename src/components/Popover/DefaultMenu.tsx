import { Menu } from '@mui/material';

const DefaultMenu = ({
    anchorEl,
    setAnchorEl,
    children,
}: {
    anchorEl: null | HTMLElement;
    setAnchorEl: (anchorEl: null | HTMLElement) => void;
    children: React.ReactNode;
}) => {
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            MenuListProps={{
                'aria-labelledby': 'menu',
            }}
            sx={{
                '& .MuiPaper-root': {
                    marginTop: 2,
                    minWidth: 150
                },
            }}
        >
            {children}
        </Menu>
    );
};

export default DefaultMenu;

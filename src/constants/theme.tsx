import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#00A651',
                    light: '#00C66C',
                    dark: '#007E3E',
                },
                secondary: {
                    main: '#FFCD00',
                    light: '#FFE566',
                    dark: '#C79C00',
                },
                background: {
                    default: '#FFFFFF',
                    paper: '#F3F4F6',
                },
                text: {
                    primary: '#212121',
                    secondary: '#757575',
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: '#FFD700',
                    light: '#FFE566',
                    dark: '#C79C00',
                },
                secondary: {
                    main: '#00C66C',
                    light: '#00A651',
                    dark: '#005F30',
                },
                background: {
                    default: '#121212',
                    paper: '#1E1E1E',
                },
                text: {
                    primary: '#E0E0E0',
                    secondary: '#B0B0B0',
                },
            },
        },
    },
    typography: {
        fontFamily: ['Public Sans', 'sans-serif'].join(','),
        h5: {
            fontWeight: 'bold',
        },
        h6: {
            fontWeight: 'bold',
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
    },
});

export default theme;

// theme.js
import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
    palette: {
        secondary: {
            main: '#116466',
        },
        background: {
            main: '#2C3531',
        },
        text: {
            main: '#FFCB9A',
        },
        primary: {
            main: '#2C3531',
        },
        light: {
            main: '#D9B08C',
        },
        accent: {
            main: '#D1E8E2',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
            fontSize: '2rem',
        },
        // другие настройки типографики
    },
});

const theme = createTheme({
    ...baseTheme,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#C5C6C7',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#66FCF1',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: baseTheme.palette.secondary.main, // цвет фона для Card компонента
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: baseTheme.palette.text.main,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        color: '#ffffff', // цвет текста
                    },
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1976d2', // цвет границы
                    },
                    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1565c0', // цвет границы при наведении
                    },
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: baseTheme.palette.text.main, // цвет текста табов
                    '&.Mui-selected': {
                        color: baseTheme.palette.accent.main, // цвет текста выбранного таба
                    },
                },
                textColorInherit: {
                    opacity: 1,
                },
                wrapper: {
                    textTransform: 'none',
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: baseTheme.palette.text.main, // цвет индикатора табов
                },
            },
        },
        // добавьте другие компоненты по мере необходимости
    },
});

export default theme;

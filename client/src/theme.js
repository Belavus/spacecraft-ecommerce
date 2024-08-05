// theme.js
import { createTheme } from '@mui/material/styles';

const primaryColor = '#001f3f'; // Основной цвет (темно-синий)
const secondaryColor = '#0074D9'; // Вторичный цвет (синий)
const backgroundColor = '#111111'; // Цвет фона (темный)
const textColor = '#FFFFFF'; // Цвет текста (белый)
const lightColor = '#B0E0E6'; // Светлый цвет (пастельный)
const warningColor = '#FF851B'; // Цвет предупреждения (оранжевый)

const theme = createTheme({
    palette: {
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: secondaryColor,
        },
        background: {
            default: backgroundColor,
            paper: '#222222', // Цвет для карточек и других элементов
        },
        text: {
            primary: textColor,
            secondary: lightColor,
        },
        warning: {
            main: warningColor,
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: textColor,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            color: textColor,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
            color: textColor,
        },
        body1: {
            fontSize: '1rem',
            color: textColor,
        },
        body2: {
            fontSize: '0.875rem',
            color: lightColor,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontSize: '1rem',
                    padding: '10px 20px',
                },
                containedPrimary: {
                    backgroundColor: primaryColor,
                    color: textColor,
                    '&:hover': {
                        backgroundColor: '#001a35',
                    },
                },
                containedSecondary: {
                    backgroundColor: secondaryColor,
                    color: textColor,
                    '&:hover': {
                        backgroundColor: '#005bb5',
                    },
                },
                outlinedPrimary: {
                    borderColor: primaryColor,
                    color: primaryColor,
                    '&:hover': {
                        backgroundColor: '#001a35',
                        color: textColor,
                    },
                },
                outlinedSecondary: {
                    borderColor: secondaryColor,
                    color: secondaryColor,
                    '&:hover': {
                        backgroundColor: '#005bb5',
                        color: textColor,
                    },
                },
                textPrimary: {
                    color: textColor,//color for Button's text in Card
                    '&:hover': {
                        backgroundColor: '#001a35',
                        color: textColor,
                    },
                },
                textSecondary: {
                    color: secondaryColor,
                    '&:hover': {
                        backgroundColor: '#005bb5',
                        color: textColor,
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#222222',
                    color: textColor,
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: textColor,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        color: textColor,
                    },
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: secondaryColor,
                    },
                    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: lightColor,
                    },
                    '& .MuiInputLabel-root': {
                        color: lightColor,
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: primaryColor,
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#222222',
                    color: textColor,
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: secondaryColor,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: textColor,
                    '&.Mui-selected': {
                        color: secondaryColor,
                    },
                },
            },
        },
    },
});

export default theme;

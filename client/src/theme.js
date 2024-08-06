// theme.js
import { createTheme } from '@mui/material/styles';

const primaryColor = '#2C3531'; // Основной цвет (темно-синий)
const secondaryColor = '#D9B08C'; // Вторичный цвет (бежевый)
const backgroundColor = '#116466'; // Цвет фона (темный)
const textColor = '#FFCB9A'; // Цвет текста (белый)
const lightColor = '#D1E8E2'; // Светлый цвет (пастельный)
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
        fontFamily: 'roboto, sans-serif',
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
                    color: textColor, // цвет текста для кнопок
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
                        backgroundColor: backgroundColor, // Set your desired background color here
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
                    '& .MuiInputBase-input': {
                        color: textColor,
                    },
                    '& .MuiOutlinedInput-input': {
                        color: textColor,
                    },
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
                        backgroundColor: backgroundColor, // Set your desired background color here
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: secondaryColor,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: lightColor,
                        },
                        '& .MuiInputLabel-root': {
                            color: lightColor,
                        },
                        '& .MuiInputBase-input': {
                            color: textColor,
                        },
                        '& .MuiOutlinedInput-input': {
                            color: textColor,
                        },
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
        MuiLink: {
            styleOverrides: {
                root: {
                    color: textColor,
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline',
                        color: lightColor,
                    },
                },
            },
        },
    },
});

export default theme;

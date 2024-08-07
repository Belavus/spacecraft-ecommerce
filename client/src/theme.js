// theme.js
import { createTheme } from '@mui/material/styles';

//colors variant 1:
// const primaryColor = '#2C3531'; // Основной цвет (темно-синий)
// const secondaryColor = '#D9B08C'; // Вторичный цвет (бежевый)
// const backgroundColor = '#116466'; // Цвет фона (темный)
// const textColor = '#FFCB9A'; // Цвет текста (белый)
// const lightColor = '#D1E8E2'; // Светлый цвет (пастельный)
// const warningColor = '#FF851B'; // Цвет предупреждения (оранжевый)

//colors variant 2 - Великолепный контраст 27:
const primaryColor = '#61892F'; // Основной цвет (темно-синий)
const secondaryColor = '#86C232'; // Вторичный цвет (бежевый)
const backgroundColor = '#222629'; // Цвет фона (темный)
const backgroundColor2 = '#474B4F'; // Цвет фона (темный)
const backgroundColor3 = '#6B6E70'; // Цвет фона (темный)
const textColor = '#ffffff'; // Цвет текста (белый)
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
            paper: backgroundColor2, // Цвет для карточек и других элементов
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
                    margin:'2px',
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontSize: '1rem',
                    padding: '5px 10px',
                },
                containedPrimary: {
                    backgroundColor: primaryColor,
                    color: textColor,
                    '&:hover': {
                        backgroundColor: secondaryColor,
                    },
                },
                containedSecondary: {
                    backgroundColor: primaryColor,
                    color: textColor,
                    '&:hover': {
                        backgroundColor: secondaryColor,
                    },
                },
                outlinedPrimary: {
                    borderColor: primaryColor,
                    color: primaryColor,
                    '&:hover': {
                        backgroundColor: secondaryColor,
                        color: textColor,
                    },
                },
                outlinedSecondary: {
                    borderColor: secondaryColor,
                    color: secondaryColor,
                    '&:hover': {
                        backgroundColor: secondaryColor,
                        color: textColor,
                    },
                },
                textPrimary: {
                    backgroundColor:primaryColor,
                    color: textColor, // цвет текста для кнопок
                    '&:hover': {
                        backgroundColor: secondaryColor,
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
                    backgroundColor: backgroundColor2,
                    color: textColor,
                    padding: '0px',
                    borderRadius: '15px',
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
                    '& > .MuiInputBase-root': { // Target child with class MuiInputBase-root
                        backgroundColor: backgroundColor, // Set your desired background color
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
                option: {
                    backgroundColor: backgroundColor, // Используйте ваш цвет фона
                    '&:hover': {
                        backgroundColor: backgroundColor, // Используйте ваш светлый цвет для hover
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

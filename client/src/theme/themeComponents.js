import {
    backgroundGradient,
    fallbackColor,
    primaryColor,
    secondaryColor,
    buttonColor,
    buttonHoverColor,
    textColor,
    lightColor,
    cardBackgroundColor
} from './colors';
import { HEADER_HEIGHT } from './sizes';

export const components = {
    MuiCssBaseline: {
        styleOverrides: {
            body: {
                backgroundColor: fallbackColor,
                backgroundImage: backgroundGradient,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                color: textColor,
            },
        },
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                position: 'fixed',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                boxShadow: 'none',
            },
        },
    },
    MuiToolbar: {
        styleOverrides: {
            root: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: HEADER_HEIGHT,
            },
        },
    },
    MuiIconButton: {
        styleOverrides: {
            root: {
                padding: 0,
            },
        },
    },
    MuiButton: {
        styleOverrides: {
            root: {
                margin: '2px',
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '1rem',
                padding: '5px 10px',
            },
            containedPrimary: {
                backgroundColor: buttonColor,
                color: textColor,
                '&:hover': {
                    backgroundColor: buttonHoverColor,
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
                backgroundColor: buttonColor,
                color: textColor,
                '&:hover': {
                    backgroundColor: buttonHoverColor,
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
                backgroundColor: cardBackgroundColor,
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
                    backgroundColor: fallbackColor,
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
                '& input:-webkit-autofill': {
                    WebkitBoxShadow: `0 0 0 1000px ${fallbackColor} inset`,
                    WebkitTextFillColor: textColor,
                },
            },
        },
    },
    MuiAutocomplete: {
        styleOverrides: {
            root: {
                '& > .MuiInputBase-root': {
                    backgroundColor: fallbackColor,
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
                backgroundColor: fallbackColor,
                '&:hover': {
                    backgroundColor: fallbackColor,
                },
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
    MuiRating: {
        styleOverrides: {
            root: {
                color: textColor,
            },
            iconEmpty: {
                color: textColor,
            },
        },
    },
};

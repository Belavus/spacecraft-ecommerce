import { createTheme } from '@mui/material/styles';
import { palette } from './colors';
import { typography } from './typography';
import { components } from './themeComponents';

const theme = createTheme({
    palette,
    typography,
    components,
});

export default theme;

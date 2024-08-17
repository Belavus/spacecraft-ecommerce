import { createTheme } from '@mui/material/styles';
import { palette } from './colors';
import { typography } from './typography';
import { components } from './themeComponents';
import {HEADER_HEIGHT, PAGE_PADDING_TOP} from "./sizes";

const mainTheme = createTheme({
    palette,
    typography,
    components,
    sizes: {
        headerHeight: `${HEADER_HEIGHT}px`,
        pagePaddingTop: PAGE_PADDING_TOP,
    },
});

export default mainTheme;

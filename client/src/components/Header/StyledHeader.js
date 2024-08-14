import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    position: 'fixed',
    backgroundColor: theme.palette.primary.main,
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: theme.sizes.headerHeight,
}));

export const StyledIconButton = styled(IconButton)({
    padding: 0,
});

export const Logo = styled('img')(({ theme }) => ({
    height: '100%',
    maxHeight: theme.sizes.headerHeight,
}));

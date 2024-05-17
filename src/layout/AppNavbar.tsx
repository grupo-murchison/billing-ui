import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Stack, styled, useTheme } from '@mui/material';

import { MenuIcon, SearchIcon, QuestionMarkIcon } from '@assets/icons';
import { useLayoutContext } from './context/useLayoutContext';
import { AuthContext } from '@app/contexts';
import { useContext } from 'react';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0px 0px 0px -1px rgba(0,0,0,0.2),0px 0px 0px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
}));

const Navbar = () => {
  const {logout, allowAccess} = useContext(AuthContext)
  const theme = useTheme();
  const { toogleSidebar } = useLayoutContext();

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <IconButton
          edge='start'
          aria-label='menu'
          sx={{
            'height': '64px',
            'width': '50px',
            'color': theme.palette.common.white,
            'mr': 2,
            'borderRadius': 0,
            'backgroundColor': theme.palette.primary.main,
            'marginLeft': '-24px',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          onMouseEnter={() => toogleSidebar(true)}
          onMouseLeave={() => toogleSidebar(false)}
        >
          <MenuIcon />
        </IconButton>
        <Stack direction='row' justifyContent='space-between' width='100%'>
          <Box component='img' src='/logo/logo-murchison.png' alt='Logo Grupo Murchison' sx={{ height: '45px' }} />

          <Stack direction='row' spacing={2} alignItems='center' sx={{ p: 0.5 }}>
            <IconButton
              size='small'
              sx={{
                border: '2px solid',
                color: theme.palette.secondary.main,
              }}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              size='small'
              sx={{
                border: '2px solid',
                color: theme.palette.secondary.main,
              }}
            >
              <QuestionMarkIcon />
            </IconButton>
            <Avatar
              alt='profile user'
              // src={avatar1}
              sx={{
                backgroundColor: theme.palette.secondary.main,
              }}
            />
            <Typography variant='h6'>Nombre de usuario <button onClick={logout}>logout</button></Typography>
            {/* <button onClick={() => allowAccess('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0ZzFAdGVzdC5jb20iLCJpYXQiOjE3MTU4ODgwMDAsImV4cCI6MTcxMDAwMDAwMCwiYXVkIjoiQklMTElOR19VSSIsImlzcyI6IkxPR0lOX1NFUlZJQ0UiLCJzdWIiOiI1In0.XguTCshllu21m92JDnGRNGTkse-xfrhWa919Bj9OeEo')}>cambiar token</button> */}
            {/* <button onClick={() => allowAccess("undefined")}>cambiar token 2</button> */}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

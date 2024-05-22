import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Stack, styled, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { MenuIcon, SearchIcon, QuestionMarkIcon } from '@assets/icons';
import { useLayoutContext } from './context/useLayoutContext';
import { AuthContext } from '@app/contexts';
import { useContext, useState } from 'react';

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

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {logout, allowAccess} = useContext(AuthContext)
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Nombre de usuario
      </Button>
      <Menu
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >

        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}


const Navbar = () => {
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
            <UserMenu/>
            {/* <Typography variant='h6'>Nombre de usuario</Typography>k */}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

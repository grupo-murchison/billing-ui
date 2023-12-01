import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box/Box';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

import AppMenu from './AppMenu';
import { useLayoutContext } from './context/useLayoutContext';
import { drawerWidthOpen, drawerWidthClosed } from './context/constants';

import menuItems from '@app/routes/menuItems.config';

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidthOpen,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: drawerWidthClosed,
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidthOpen,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const Sidebar = () => {
  const theme = useTheme();
  const { isSidebarOpen, toogleSidebar } = useLayoutContext();

  const handleSidebar = (res: boolean) => {
    if (res) {
      !isSidebarOpen && toogleSidebar(true);
    } else {
      isSidebarOpen && toogleSidebar(false);
    }
  };

  return (
    <Drawer
      variant='permanent'
      open={isSidebarOpen}
      PaperProps={{
        sx: {
          'backgroundColor': theme.palette.primary.main,
          'color': theme.palette.common.white,
          'overflow': 'hidden',
          'overflowY': 'auto',
          '&::-webkit-scrollbar': {
            width: '0',
          },
        },
      }}
      onMouseEnter={() => handleSidebar(true)}
      onMouseLeave={() => handleSidebar(false)}
    >
      <Toolbar />
      <Box>
        <AppMenu menuItems={menuItems} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;

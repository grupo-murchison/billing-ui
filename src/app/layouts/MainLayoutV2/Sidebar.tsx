import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box/Box';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { MenuItemsNestedList } from './MenuItems/MenuItems';
import menuItems from './MenuItems/menuItems.config';
import { useSidebarContext } from './context/useSidebarContext';

const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: '50px',
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
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
  const { isSidebarOpen, toogleSidebar } = useSidebarContext();

  return (
    <Drawer
      variant='permanent'
      open={isSidebarOpen}
      PaperProps={{
        sx: { backgroundColor: theme.palette.primary.main, color: theme.palette.common.white },
      }}
      onMouseEnter={toogleSidebar}
      onMouseLeave={toogleSidebar}
    >
      <Toolbar />
      <Box>
        <MenuItemsNestedList menuItems={menuItems} open={isSidebarOpen} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;

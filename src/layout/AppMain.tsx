import { ReactNode } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box/Box';
import { Outlet } from 'react-router-dom';
import { drawerWidthClosed } from './context/constants';

function Main({ children }: { children: ReactNode }) {
  return (
    <>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: '1.5rem',
          heigth: '100%',
          position: 'absolute',
          paddingLeft: `calc(1.5rem + ${drawerWidthClosed}px)`,
          width: '100%',
        }}
      >
        <Toolbar />
        {children || <Outlet />}
      </Box>
    </>
  );
}

export default Main;

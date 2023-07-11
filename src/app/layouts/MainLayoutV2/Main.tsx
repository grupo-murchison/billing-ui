import { ReactNode } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box/Box';
import { Outlet } from 'react-router-dom';

function Main({ children }: { children: ReactNode }) {
  return (
    <>
      <Box component='main' sx={{ flexGrow: 1, p: 3, heigth: '100%' }}>
        <Toolbar />
        {children || <Outlet />}
      </Box>
    </>
  );
}

export default Main;

import { ReactNode } from 'react';
import Box from '@mui/material/Box/Box';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar';
import Main from './Main';
import SidebarProvider from './context/SidebarProvider';

function MainLayout({ children }: { children?: ReactNode }) {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <SidebarProvider>
          <Navbar />
          <Sidebar />
        </SidebarProvider>
        <Main>{children}</Main>
      </Box>
    </>
  );
}

export default MainLayout;
import { ReactNode } from 'react';
import Box from '@mui/material/Box/Box';
import Navbar from './AppNavbar';
import Sidebar from './AppSidebar';
import Main from './AppMain';
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

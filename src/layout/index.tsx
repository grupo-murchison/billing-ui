import { ReactNode } from 'react';
import Box from '@mui/material/Box/Box';
import Navbar from './AppNavbar';
import Sidebar from './AppSidebar';
import Main from './AppMain';
import LayoutProvider from './context/LayoutProvider';

function MainLayout({ children }: { children?: ReactNode }) {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <LayoutProvider>
          <Navbar />
          <Sidebar />
        </LayoutProvider>
        <Main>{children}</Main>
      </Box>
    </>
  );
}

export default MainLayout;

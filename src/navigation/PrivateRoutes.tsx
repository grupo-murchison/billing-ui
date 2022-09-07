import { Routes, Route } from 'react-router-dom';

import { Navbar, PageContainer, Sidebar } from '@layouts';

import { PageExample } from '@pages';

const PrivateRoutes = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <PageContainer>
        <Routes>
          <Route path='/' element={<PageExample />} />
        </Routes>
      </PageContainer>
    </>
  );
};

export default PrivateRoutes;

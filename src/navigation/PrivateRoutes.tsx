import { Routes, Route } from 'react-router-dom';

import { PageContainer } from '@components';

import { Navbar, Sidebar } from '@features';

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

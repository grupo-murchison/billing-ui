import type { ReactNode } from 'react';

import { Header, Content } from '@app/layouts/MainLayout/components';
import { MainLayoutProvider } from '@app/layouts/MainLayout/contexts';

import styles from '@app/layouts/MainLayout/MainLayout.module.scss';

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <MainLayoutProvider>
      <div className={styles['main-layout']}>
        <Header />
        <Content>{children}</Content>
      </div>
    </MainLayoutProvider>
  );
};

type MainLayoutProps = {
  children?: ReactNode;
};

export default MainLayout;

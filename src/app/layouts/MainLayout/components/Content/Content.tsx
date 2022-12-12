import type { ReactNode } from 'react';

import { Sidebar } from '@app/layouts/MainLayout/components/Content/components';

import styles from '@app/layouts/MainLayout/components/Content/Content.module.scss';

const Content = ({ children }: ContentProps) => {
  return (
    <div className={styles['content']}>
      <Sidebar />
      <div className={styles['content-page']}>{children}</div>
    </div>
  );
};

type ContentProps = {
  children?: ReactNode;
};

export default Content;

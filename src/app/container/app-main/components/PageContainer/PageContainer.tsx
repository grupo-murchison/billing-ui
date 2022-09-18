import type { ReactNode } from 'react';

import './PageContainer.scss';

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <main className='app-main'>
      <div className='main__container'>{children}</div>
    </main>
  );
};

type PageContainerProps = {
  children: ReactNode;
};

export default PageContainer;

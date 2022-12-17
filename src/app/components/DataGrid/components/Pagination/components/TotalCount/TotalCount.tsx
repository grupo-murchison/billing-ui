import { useContext } from 'react';

import { DataGridContext } from '@app/components/DataGrid/contexts';

import styles from '@app/components/DataGrid/components/Pagination/components/TotalCount/TotalCount.module.scss';

const TotalCount = () => {
  const { rowsTotalCount } = useContext(DataGridContext);

  return (
    <div className={styles['total-count']}>
      <label>Total:</label>
      <span>{rowsTotalCount}</span>
    </div>
  );
};

export default TotalCount;

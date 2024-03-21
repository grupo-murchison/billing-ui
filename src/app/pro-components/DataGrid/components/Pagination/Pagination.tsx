import { ArrowButtons, TotalCount, RowsPerPage } from '@app/pro-components/DataGrid/components/Pagination/components';

import styles from '@app/pro-components/DataGrid/components/Pagination/Pagination.module.scss';

const DataGridPagination = () => {
  return (
    <div className={styles['pagination']}>
      <TotalCount />
      <RowsPerPage className={styles['pagination__rows-per-page']} />
      <ArrowButtons className={styles['pagination__arrow-buttons']} />
    </div>
  );
};

export default DataGridPagination;

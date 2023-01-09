import { useContext } from 'react';

import clsx from 'clsx';

import { DataGridContext } from '@app/pro-components/DataGrid/contexts';

import styles from '@app/pro-components/DataGrid/components/Pagination/components/RowsPerPage/RowsPerPage.module.scss';

const RowsPerPage = ({ className }: RowsPerPageProps) => {
  const { handleChangeRowsPerPage, rowsPerPage } = useContext(DataGridContext);

  return (
    <div className={clsx(styles['rows-per-page'], className)}>
      <label>Filas por página:</label>
      <select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
};

type RowsPerPageProps = {
  className?: string;
};

export default RowsPerPage;

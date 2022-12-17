import clsx from 'clsx';

import { Pagination, Table, Toolbar } from '@app/components/DataGrid/components';
import { DataGridProvider } from '@app/components/DataGrid/contexts';
import { DataGridProps } from '@app/components/DataGrid/utils/types';

import styles from '@app/components/DataGrid/DataGrid.module.scss';

const DataGrid = <T,>(props: DataGridProps<T>) => {
  return (
    <DataGridProvider {...props}>
      <div className={clsx(styles['data-grid'])}>
        <Toolbar />
        <Table />
        <Pagination />
      </div>
    </DataGridProvider>
  );
};

export default DataGrid;

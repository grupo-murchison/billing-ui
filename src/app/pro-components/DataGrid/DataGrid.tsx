import clsx from 'clsx';

import {
  Pagination,
  Table,
  Toolbar,
  DeleteButton,
  EditButton,
  ViewButton,
} from '@app/pro-components/DataGrid/components';
import { DataGridProvider } from '@app/pro-components/DataGrid/contexts';
import { DataGridProps } from '@app/pro-components/DataGrid/utils/types';

import styles from '@app/pro-components/DataGrid/DataGrid.module.scss';

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

DataGrid.DeleteButton = DeleteButton;
DataGrid.EditButton = EditButton;
DataGrid.ViewButton = ViewButton;

export default DataGrid;

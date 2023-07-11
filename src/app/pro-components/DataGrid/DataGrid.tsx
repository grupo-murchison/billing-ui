import clsx from 'clsx';

import { Pagination, Table, Toolbar } from '@app/pro-components/DataGrid/components';
// import { DataGridProvider } from '@app/pro-components/DataGrid/contexts';
import { DataGridProvider } from '@app/pro-components/DataGrid/contexts';
import { DataGridProps } from '@app/pro-components/DataGrid/utils/types';

import styles from '@app/pro-components/DataGrid/DataGrid.module.scss';
import { EditIconButton } from './components/EditButton/EditButton';
import { DeleteIconButton } from './components/DeleteButton/DeleteButton';
import { ViewIconButton } from './components/ViewButton/ViewButton';

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

DataGrid.DeleteButton = DeleteIconButton;
DataGrid.EditButton = EditIconButton;
DataGrid.ViewButton = ViewIconButton;

export default DataGrid;

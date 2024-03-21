import { Pagination, Table, Toolbar } from '@app/pro-components/DataGrid/components';
// import { DataGridProvider } from '@app/pro-components/DataGrid/contexts';
import { DataGridProvider } from '@app/pro-components/DataGrid/contexts';
import { DataGridProps } from '@app/pro-components/DataGrid/utils/types';

import { EditIconButton } from './components/EditButton/EditButton';
import { DeleteIconButton } from './components/DeleteButton/DeleteButton';
import { ViewIconButton } from './components/ViewButton/ViewButton';
import { Stack } from '@mui/material';

/** @deprecated  import DataGrid form "@app/components/DataGrid instead"  */
const DataGrid = <T,>(props: DataGridProps<T>) => {
  return (
    <DataGridProvider {...props}>
      <Stack>
        <Toolbar />
        <Table />
        <Pagination />
      </Stack>
    </DataGridProvider>
  );
};

DataGrid.DeleteButton = DeleteIconButton;
DataGrid.EditButton = EditIconButton;
DataGrid.ViewButton = ViewIconButton;

export default DataGrid;

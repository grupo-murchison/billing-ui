import { DataGridPagination, DataGridTable } from '@app/components/DataGrid/components';
import { DataGridProvider } from '@app/components/DataGrid/contexts';
import { DataGridProps } from '@app/components/DataGrid/utils/types';

import MUITableCell from '@mui/material/TableCell';

import './DataGrid.scss';

const DataGrid = <T,>(props: DataGridProps<T>) => {
  return (
    <DataGridProvider {...props}>
      <div className='data-grid'>
        <DataGridTable />
        <DataGridPagination />
      </div>
    </DataGridProvider>
  );
};

DataGrid.TableCell = MUITableCell;

export default DataGrid;

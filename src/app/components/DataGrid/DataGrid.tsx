import {
  DataGridPagination,
  // DataGridToolbar,
  DataGridTable,
} from '@app/components/DataGrid/components';
import { DataGridProvider } from '@app/components/DataGrid/contexts';
import { DataGridProps } from '@app/components/DataGrid/utils/types';

import MUITableCell from '@mui/material/TableCell';

import './DataGrid.scss';

const DataGrid = (props: DataGridProps) => {
  return (
    <DataGridProvider {...props}>
      <div className='data-grid'>
        {/* <DataGridToolbar /> */}
        <DataGridTable />
        <DataGridPagination />
      </div>
    </DataGridProvider>
  );
};

DataGrid.TableCell = MUITableCell;

export default DataGrid;

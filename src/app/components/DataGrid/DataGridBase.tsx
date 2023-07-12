import { DataGrid as MUIDataGrid, DataGridProps } from '@mui/x-data-grid';
import { useContext } from 'react';

import { DataGridContext } from '@app/pro-components/DataGrid/contexts';

const DataGridBase = ({ rows, columns }: DataGridProps) => {
  // Repartir el espacio en partes iguales
  columns.forEach((col: any) => {
    col['flex'] = col?.flex ? col.flex : 1;
  });

  const pageSize = 10;
  const page = 1;

  return (
    <>
      <MUIDataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 50, 100]}
        // paginationModel={{ page, pageSize }}
        autoHeight={true}
        sx={{
          '& .MuiDataGrid-row:hover': {
            background: '#CCCED0',
            // color: 'primary.main',
          },
        }}
      />
    </>
  );
};

export default DataGridBase;

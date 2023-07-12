import { useContext } from 'react';

import { DataGridContext } from './contexts';

import { DataGrid as MUIDataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';

const DataGridWithContext = () => {
  const { columnHeads: columns, rows, loading, currentPage, rowsPerPage } = useContext(DataGridContext);

  // Repartir el espacio en partes iguales
  columns.forEach((col: any) => {
    col['flex'] = col?.flex ? col.flex : 1;
  });

  const pageSize = rowsPerPage || 25;
  const page = currentPage || 1;

  return (
    <>
      <MUIDataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 50, 100]}
        paginationModel={{ page, pageSize }} // TODO falta terminar de ver si esto esta bien o es así
        autoHeight={true}
        loading={loading}
        slots={{
          loadingOverlay: LinearProgress,
        }}
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

export default DataGridWithContext;

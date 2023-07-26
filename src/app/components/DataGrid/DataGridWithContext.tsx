import { useContext } from 'react';
import { DataGrid as MUIDataGrid } from '@mui/x-data-grid';

import { DataGridContext } from './contexts';
import DataGridBase from './DataGridBase';

const DataGridWithContext = () => {
  const {
    columnHeads: columns,
    rows,
    loading,
    currentPage,
    rowsPerPage,
    toolbar: Toolbar,
  } = useContext(DataGridContext);

  // Repartir el espacio en partes iguales
  columns.forEach((col: any) => {
    col['flex'] = col?.flex ? col.flex : 1;
  });

  const pageSize = rowsPerPage || 25;
  const page = currentPage || 1;

  return (
    <>
      <DataGridBase
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 50, 100]}
        // paginationModel={{ page, pageSize }} // TODO falta terminar de ver si esto esta bien o es así
        // autoHeight={true}
        // loading={loading}
        // slots={{
        //   loadingOverlay: LinearProgress,
        //   noRowsOverlay: NoRowsContent,
        //   toolbar: Toolbar,
        // }}
        // slotProps={{
        //   pagination: {
        //     labelRowsPerPage: 'Filas por página:',
        //   },
        // }}
        // sx={{
        //   ...sxTable,
        //   ...sxHeader,
        //   ...sxRows,
        // }}
      />
    </>
  );
};

export default DataGridWithContext;

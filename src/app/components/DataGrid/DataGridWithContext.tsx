import { useContext } from 'react';

import { DataGridContext } from './contexts';

import { DataGrid as MUIDataGrid  } from '@mui/x-data-grid';

const DataGridWithContext = () => {
  const { columnHeads: columns, rows } = useContext(DataGridContext);

  // Repartir el espacio en partes iguales
  columns.forEach((col: any) => {
    col['flex'] = col?.flex ? col.flex : 1;
  });

  return (
    <>
      <MUIDataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
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

export default DataGridWithContext;

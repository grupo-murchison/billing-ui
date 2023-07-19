import { useContext } from 'react';
import { SxProps, useTheme } from '@mui/material';
import { DataGrid as MUIDataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import NoRowsContent from './components/NoRowsContent';

import { DataGridContext } from './contexts';
import { localeText } from './constants/dataGrid.config';

const DataGridWithContext = () => {
  const theme = useTheme();

  const sxTable: SxProps = {
    '& .MuiDataGrid-root': {
      border: '1.25px solid',
    },
  };

  const sxHeader: SxProps = {
    '& .MuiDataGrid-columnHeader': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.text.disabled,
    },
  };

  const sxRows: SxProps = {
    '& .MuiDataGrid-row:nth-of-type(even)': {
      backgroundColor: theme.palette.background.default,
    },
    '& .MuiDataGrid-row:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.paper,
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: '#CCCED0',
    },
  };

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
      <MUIDataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 50, 100]}
        // paginationModel={{ page, pageSize }} // TODO falta terminar de ver si esto esta bien o es así
        autoHeight={true}
        loading={loading}
        localeText={{ ...localeText }}
        checkboxSelection
        slots={{
          loadingOverlay: LinearProgress,
          noRowsOverlay: NoRowsContent,
          toolbar: Toolbar,
        }}
        slotProps={{
          pagination: {
            labelRowsPerPage: 'Filas por página:',
          },
        }}
        sx={{
          ...sxTable,
          ...sxHeader,
          ...sxRows,
        }}
      />
    </>
  );
};

export default DataGridWithContext;

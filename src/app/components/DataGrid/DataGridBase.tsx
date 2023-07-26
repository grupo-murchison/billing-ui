import { DataGrid as MUIDataGrid, DataGridProps } from '@mui/x-data-grid';
import { SxProps, useTheme } from '@mui/material';

import LinearProgress from '@mui/material/LinearProgress';
import NoRowsContent from './components/NoRowsContent';

import { localeText } from './constants/dataGrid.config';

const DataGridBase = ({
  rows,
  columns,
  loading,
  pageSizeOptions,
  // toolbar: Toolbar,
  ...props
}: DataGridProps) => {
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

  // Repartir el espacio en partes iguales
  columns.forEach((col: any) => {
    col['flex'] = col?.flex ? col.flex : 1;
  });

  const pageSize = 10;
  const page = 1;

  return (
    <>
      <MUIDataGrid
        {...props}
        rows={rows}
        columns={columns}
        pageSizeOptions={pageSizeOptions || [10, 25, 50, 100]}
        // paginationModel={{ page, pageSize }} // TODO falta terminar de ver si esto esta bien o es así
        autoHeight={true}
        loading={loading}
        localeText={{ ...localeText }}
        slots={{
          loadingOverlay: LinearProgress,
          noRowsOverlay: NoRowsContent,
          // toolbar: Toolbar,
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

export default DataGridBase;

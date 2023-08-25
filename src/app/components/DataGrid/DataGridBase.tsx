import { DataGrid as MUIDataGrid, DataGridProps as DataGridPropsMUI } from '@mui/x-data-grid';
import { Button, Paper, Stack, SxProps, useTheme } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

import NoRowsContent from './components/NoRowsContent';

import { AddIcon } from '@assets/icons';

import { localeText } from './constants/dataGrid.config';
import * as helperGrid from './helpers';

const DataGridBase = ({
  rows,
  columns,
  loading,
  pageSizeOptions,
  onClickNew,
  toolbar: Toolbar,
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
      fontSize: theme.typography.h6.fontSize,
      textTransform: 'lowercase',
    },
    '& .MuiDataGrid-columnHeader :first-letter': {
      textTransform: 'capitalize',
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

  const pageSize = 10;
  const page = 1;

  helperGrid.columnsFlexResolver(columns);

  return (
    <>
      {onClickNew && (
        <Stack sx={{ justifyContent: 'flex-end', marginBottom: 2, paddingTop: 3 }} direction='row'>
          <Button onClick={onClickNew} color='primary' variant='contained' startIcon={<AddIcon />}>
            Alta
          </Button>
        </Stack>
      )}

      <Paper>
        <MUIDataGrid
          {...props}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: helperGrid.pageSizeOptionsResolver(pageSizeOptions).pageSize } },
          }}
          pageSizeOptions={helperGrid.pageSizeOptionsResolver(pageSizeOptions).pageSizeOptions}
          // paginationModel={{ page, pageSize }} // TODO falta terminar de ver si esto esta bien o es así
          autoHeight={rows.length > 0 ? true : false}
          loading={loading}
          localeText={{ ...localeText }}
          slots={{
            loadingOverlay: LinearProgress,
            noRowsOverlay: NoRowsContent,
            toolbar: Toolbar,
          }}
          slotProps={{
            pagination: {
              labelRowsPerPage: 'Filas por página:',
              labelDisplayedRows: props => {
                const { from, to, count } = props;
                return `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`;
              },
            },
          }}
          sx={{
            height: rows.length > 0 ? undefined : '380px',
            ...sxTable,
            ...sxHeader,
            ...sxRows,
          }}
        />
      </Paper>
    </>
  );
};

export default DataGridBase;

interface DataGridProps extends DataGridPropsMUI {
  onClickNew?: () => void;
  /**
   * Select the pageSize dynamically using the component UI.
   * @default [10, 25, 50]
   */
  pageSizeOptions?: helperGrid.PageSizeOptions;
  toolbar?: AnyValue;
}

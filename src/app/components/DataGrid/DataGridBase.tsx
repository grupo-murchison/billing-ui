import { DataGrid as MUIDataGrid, DataGridProps as DataGridPropsMUI } from '@mui/x-data-grid';
import { Paper, SxProps, alpha, useTheme } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

import NoRowsContent from './components/NoRowsContent';
import ToolbarBase from './components/Toolbar';

import { localeText } from './constants/dataGrid.config';
import * as helperGrid from './helpers';

const DataGridBase = ({
  rows = [],
  columns,
  loading,
  pageSizeOptions,
  onClickNew,
  toolbar,
  name,
  ...props
}: DataGridProps) => {
  const theme = useTheme();

  const sxTable: SxProps = {
    '& .MuiDataGrid-root': {
      border: '1.25px solid',
    },
    'backgroundColor': rows?.length > 0 ? theme.palette.text.disabled : theme.palette.background.paper,
    'borderRadius': theme.shape,
    'overflow': 'hidden',
    '& .MuiDataGrid-footerContainer': {
      backgroundColor: theme.palette.background.paper,
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
    // '& .MuiDataGrid-columnHeaders': {
    //   borderRadius: '0px',
    // },
  };

  const sxRows: SxProps = {
    '& .MuiDataGrid-row:nth-of-type(even)': {
      'backgroundColor': theme.palette.background.default,
      '&.Mui-selected': {
        backgroundColor: alpha(theme.palette.primary.main, 0.85),
      },
    },
    '& .MuiDataGrid-row:nth-of-type(odd)': {
      'backgroundColor': theme.palette.background.paper,
      '&.Mui-selected': {
        backgroundColor: alpha(theme.palette.primary.main, 0.85),
      },
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: '#CCCED0',
    },
  };

  helperGrid.columnsFlexResolver(columns);

  const Toolbar = () => <ToolbarBase fileName={name} onClickNew={onClickNew} subComponent={toolbar} />;

  return (
    <>
      <Paper>
        <MUIDataGrid
          {...props}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: helperGrid.pageSizeOptionsResolver(pageSizeOptions).pageSize } },
          }}
          pageSizeOptions={helperGrid.pageSizeOptionsResolver(pageSizeOptions).pageSizeOptions}
          autoHeight={rows?.length > 0 ? true : false}
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
              SelectProps: {
                MenuProps: { disableScrollLock: true },
              },
            },
            baseSelect: {
              MenuProps: { disableScrollLock: true },
            },
          }}
          sx={{
            height: rows?.length > 0 ? undefined : '380px',
            // maxHeight: 600, // TODO para sticky header se debe deshabilitar autoHeight
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
  name?: string;
}

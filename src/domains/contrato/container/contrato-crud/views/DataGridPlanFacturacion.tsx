import DataGrid from '@app/components/DataGrid/DataGrid';
import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { format, parseISO } from 'date-fns';

const columns: GridColDef[] = [
  {
    field: 'periodo',
    headerName: 'Periodo',
    type: 'number',
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'liquidacionDesde',
    headerName: 'Desde',
    type: 'Date',
    headerAlign: 'center',
    align: 'center',
    valueFormatter: ({ value }) => format(parseISO(value), 'dd-MM-yyyy'),
  },
  {
    field: 'liquidacionHasta',
    headerName: 'Hasta',
    type: 'Date',
    headerAlign: 'center',
    align: 'center',
    valueFormatter: ({ value }) => format(parseISO(value), 'dd-MM-yyyy'),
  },
  {
    field: 'fechaFacturacion',
    headerName: 'Fecha Facturación',
    type: 'Date',
    headerAlign: 'center',
    align: 'center',
    valueFormatter: ({ value }) => format(parseISO(value), 'dd-MM-yyyy'),
  },
  {
    field: 'estado',
    headerName: 'Estado',
    type: 'string',
    headerAlign: 'center',
    align: 'center',
  },
];

export const DataGridPlanFacturacion = ({ rows }: { id: string; rows: any[] }) => {
  return (
    <>
      <Box style={{ width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[10]} autoHeight={true} />
      </Box>
    </>
  );
};

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { format, parseISO } from 'date-fns';

const columns: GridColDef[] = [
  { field: 'periodo', headerName: 'Periodo', width: 80, type: 'number' },
  {
    field: 'liquidacionDesde',
    headerName: 'Desde',
    width: 160,
    type: 'Date',
    valueFormatter: ({ value }) => format(parseISO(value), 'dd-MM-yyyy'),
  },
  {
    field: 'liquidacionHasta',
    headerName: 'Hasta',
    width: 160,
    type: 'Date',
    valueFormatter: ({ value }) => format(parseISO(value), 'dd-MM-yyyy'),
  },
  {
    field: 'fechaFacturacion',
    headerName: 'Fecha Facturación',
    width: 160,
    type: 'Date',
    valueFormatter: ({ value }) => format(parseISO(value), 'dd-MM-yyyy'),
  },
  { field: 'estado', headerName: 'Estado', type: 'string', width: 110 },
];

export const DataGridPlanFacturacion = ({ rows }: { id: string; rows: any }) => {
  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[10]} />
      </div>
    </>
  );
};

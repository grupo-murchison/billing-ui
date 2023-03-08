import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'periodo', headerName: 'Periodo', width: 80 },
  { field: 'liquidacionDesde', headerName: 'Desde', width: 160 },
  { field: 'liquidacionHasta', headerName: 'Hasta', width: 160 },
  { field: 'fechaFacturacion', headerName: 'Fecha Facturación', type: 'Date', width: 160 },
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

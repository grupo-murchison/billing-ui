import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'fullName',
    headerName: 'Nombre del Concepto Acuerdo',
    description: 'This column has some type value.',
    sortable: false,
    width: 250,
  },
  {
    field: 'nombreProcedimientoQ',
    headerName: 'Nombre Procedimiento Cantidad',
    width: 290,
  },
  { field: 'codigo', headerName: 'Codigo Variable', width: 130 },
  { field: 'nombreVariable', headerName: 'Nombre Variable', width: 140 },
  {
    field: 'valor',
    headerName: 'Valor',
    type: 'number',
    width: 90,
  },
];

export const DataGridContratoVariables = ({ rows }: { id: string; rows: any }) => {

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[10]} />
    </div>
  );
};

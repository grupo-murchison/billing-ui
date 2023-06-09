import * as React from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'tipoServicio', headerName: 'Tipo Servicio', width: 200 },
  { field: 'concepto', headerName: 'Concepto', width: 400 },
  { field: 'procedimientoQ', headerName: 'Procedimiento Cantidad', width: 350 },
  { field: 'procedimientoP', headerName: 'Procedimiento Precio', width: 320 },
  { field: 'procedimientoPS', headerName: 'Procedimiento Producto Softland', width: 320 },
];

export const DataGridConceptoAcuerdo = ({ rows }: { id: string; rows: any }) => {
  const _rows = rows.map((x: any) => {
    return {
      id: x.id,
      tipoServicio: x.tipoServicio.descripcion,
      tipoServicioId: x.tipoServicio.id,
      concepto: x.descripcion,
      procedimientoQId: x.procedimientoQ.id,
      procedimientoQ: `${x.procedimientoQ.codigo} - ${x.procedimientoQ.denominacion}`,
      procedimientoPId: x.procedimientoP.id,
      procedimientoP: x.procedimientoP.codigo,
      procedimientoPSId: x.procedimientoProductoSoftland.id,
      procedimientoPS: x.procedimientoProductoSoftland.codigo,
    };
  });

  return (
    <Box style={{ width: '100%' }}>
      <DataGrid rows={_rows} columns={columns} pageSize={5} rowsPerPageOptions={[10]} autoHeight={true}/>
    </Box>
  );
};

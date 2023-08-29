import DataGridBase from '@app/components/DataGrid/DataGridBase';

export const DataGridConceptoAcuerdo = ({ rows }: { id: string; rows: AnyValue }) => {
  return (
    <DataGridBase
      rows={rows}
      columns={[
        {
          field: 'tipoServicio',
          headerName: 'Tipo Servicio',
          valueGetter: ({ row }) => row?.tipoServicio?.descripcion || '',
        },
        { field: 'descripcion', headerName: 'Concepto' },
        {
          field: 'procedimientoQ',
          headerName: 'Procedimiento Cantidad',
          valueGetter: ({ row }) => `${row?.procedimientoQ?.codigo} - ${row?.procedimientoQ?.denominacion}` || '',
        },
        {
          field: 'procedimientoP',
          headerName: 'Procedimiento Precio',
          valueGetter: ({ row }) => row?.procedimientoP?.codigo || '',
        },
        {
          field: 'procedimientoPS',
          headerName: 'Procedimiento Producto Softland',
          valueGetter: ({ row }) => row?.procedimientoProductoSoftland?.codigo || '',
        },
      ]}
      pageSizeOptions={[5, 10, 25]}
    />
  );
};

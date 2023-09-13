import DataGridBase from '@app/components/DataGrid/DataGridBase';

export const DataGridConceptoAcuerdo = ({ rows }: { rows: AnyValue }) => {
  return (
    <DataGridBase
      rows={rows}
      columns={[
        {
          field: 'tipoServicio',
          headerName: 'Tipo Servicio',
          valueGetter: ({ row }) => row?.tipoServicio?.descripcion || '',
          flex: 2,
          minWidth: 250,
        },
        {
          field: 'descripcion',
          headerName: 'Concepto',
          flex: 2,
          minWidth: 250,
        },
        {
          field: 'procedimientoQ',
          headerName: 'Procedimiento Cantidad',
          valueGetter: ({ row }) => `${row?.procedimientoQ?.codigo} - ${row?.procedimientoQ?.denominacion}` || '',
          flex: 2,
          minWidth: 250,
        },
        {
          field: 'procedimientoP',
          headerName: 'Procedimiento Precio',
          valueGetter: ({ row }) => `${row?.procedimientoP?.codigo} - ${row?.procedimientoP?.denominacion}` || '',
          flex: 3,
          minWidth: 250,
        },
        {
          field: 'procedimientoPS',
          headerName: 'Procedimiento Producto Softland',
          valueGetter: ({ row }) =>
            `${row?.procedimientoProductoSoftland?.codigo} - ${row?.procedimientoProductoSoftland?.denominacion}` || '',
          flex: 5,
          minWidth: 600,
        },
      ]}
      pageSizeOptions={[5, 10, 25]}
      rowSelection={false}
    />
  );
};

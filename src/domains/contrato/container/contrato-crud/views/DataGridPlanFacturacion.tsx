import DataGridBase from '@app/components/DataGrid/DataGridBase';
import { DateLib } from '@libs';

export const DataGridPlanFacturacion = ({ rows }: { rows: AnyValue[] }) => {
  return (
    <DataGridBase
      rows={rows}
      columns={[
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
          valueFormatter: ({ value }) => DateLib.beautifyISO(value) || '',
        },
        {
          field: 'liquidacionHasta',
          headerName: 'Hasta',
          type: 'Date',
          headerAlign: 'center',
          align: 'center',
          valueFormatter: ({ value }) => DateLib.beautifyISO(value) || '',
        },
        {
          field: 'fechaFacturacion',
          headerName: 'Fecha Facturación',
          type: 'Date',
          headerAlign: 'center',
          align: 'center',
          valueFormatter: ({ value }) => DateLib.beautifyISO(value) || '',
        },
        {
          field: 'estado',
          headerName: 'Estado',
          type: 'string',
          headerAlign: 'center',
          align: 'center',
        },
      ]}
      pageSizeOptions={[5, 10, 25]}
      rowSelection={false}
    />
  );
};

import CustomChip from '@app/components/Chip/Chip';
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
          headerAlign: 'center',
          align: 'center',
          valueFormatter: ({ value }) => DateLib.beautifyISO(value) || '',
        },
        {
          field: 'liquidacionHasta',
          headerName: 'Hasta',
          headerAlign: 'center',
          align: 'center',
          valueFormatter: ({ value }) => DateLib.beautifyISO(value) || '',
        },
        {
          field: 'fechaFacturacion',
          headerName: 'Fecha Facturación',
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
          renderCell: params => {
            return (
              <CustomChip estado={params.value} />
            );
          },
        },
      ]}
      pageSizeOptions={[5, 10, 25]}
      // rowSelection={false}
    />
  );
};

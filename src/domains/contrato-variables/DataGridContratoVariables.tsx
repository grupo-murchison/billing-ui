import { useEffect, useState } from 'react';
import DataGridBase from '@app/components/DataGrid/DataGridBase';

import { ContratoRepository } from '@domains/contrato/repository';
import ContratoVariablesRepository from './repository/contrato-variables.repository';

export const DataGridContratoVariables = ({ contratoId }: { contratoId: string | undefined }) => {
  const [rows, setRows] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    ContratoRepository.variablesPorContratoProcedimientoQ({ contratoId })
      .then(({ data }) => {
        setRows(data);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [contratoId, refreshData]);

  const handleCellEdit = (params: any, event: any) => {
    setLoading(true);
    const { row, id } = params;

    row['valor'] = event.target.value;

    ContratoVariablesRepository.updateContratoVariable(row, id)
      .then()
      .catch((error: any) => {
        // TODO falta un handlerError() que sustituya el console.log
        console.log('Error al actualizar variable:\n', error);
      })
      .finally(() => {
        setRefreshData(!refreshData);
        setLoading(false);
      });
  };

  return (
    <DataGridBase
      rows={rows}
      columns={[
        {
          field: 'procedimientoQ.conceptoAcuerdo.descripcion',
          headerName: 'Nombre del Concepto Acuerdo',
          description: 'This column has some type value.',
          sortable: false,
          valueGetter: (params: any) => {
            return params.row.procedimientoQ?.conceptoAcuerdo?.descripcion || ' ';
          },
        },
        {
          field: 'procedimientoQ.denominacion',
          headerName: 'Nombre Procedimiento Cantidad',
          valueGetter: (params: any) => {
            return params.row.procedimientoQ?.denominacion || ' ';
          },
        },
        { field: 'codigo', headerName: 'Codigo Variable' },
        {
          field: 'procedimientoQ.procedimientoBuiltin.procedimientoBuiltinVariables.nombre',
          headerName: 'Nombre Variable',
          valueGetter: (params: any) => {
            return params.row.procedimientoQ?.procedimientoBuiltin?.procedimientoBuiltinVariables?.nombre || ' ';
          },
        },
        {
          field: 'valor',
          headerName: 'Valor',
          type: 'string',
          editable: true,
        },
      ]}
      loading={loading}
      onCellEditStop={handleCellEdit}
    />
  );
};

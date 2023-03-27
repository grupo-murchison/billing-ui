import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { ContratoRepository } from '@domains/contrato/repository';
import ContratoVariablesRepository from './repository/contrato-variables.repository';

const columns: GridColDef[] = [
  {
    field: 'procedimientoQ.conceptoAcuerdo.descripcion',
    headerName: 'Nombre del Concepto Acuerdo',
    description: 'This column has some type value.',
    sortable: false,
    width: 450,
    valueGetter: (params: any) => {
      return params.row.procedimientoQ?.conceptoAcuerdo?.descripcion || ' ';
    },
  },
  {
    field: 'procedimientoQ.denominacion',
    headerName: 'Nombre Procedimiento Cantidad',
    width: 350,
    valueGetter: (params: any) => {
      return params.row.procedimientoQ?.denominacion || ' ';
    },
  },
  { field: 'codigo', headerName: 'Codigo Variable', width: 150 },
  {
    field: 'procedimientoQ.procedimientoBuiltin.procedimientoBuiltinVariables.nombre',
    headerName: 'Nombre Variable',
    width: 340,
    valueGetter: (params: any) => {
      return params.row.procedimientoQ?.procedimientoBuiltin?.procedimientoBuiltinVariables?.nombre || ' ';
    },
  },
  {
    field: 'valor',
    headerName: 'Valor',
    type: 'string',
    width: 120,
    editable: true,
  },
];

export const DataGridContratoVariables = ({ contratoId }: { contratoId: string | undefined }) => {
  const [rows, setRows] = useState<any>([]); // TODO tipar
  const [loading, setLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    ContratoRepository.variablesPorContratoProcedimientoQ({ contratoId }).then(({ data }) => {
      setRows(data);
      setLoading(false);
    });
  }, [contratoId, refreshData]);

  const handleCellEdit = (params: any, event: any) => {
    setLoading(true);
    const { row, id } = params;

    row['valor'] = event.target.value;

    ContratoVariablesRepository.updateContratoVariable(row, id)
      .then(({ status }) => {
        console.log('status', status);
      })
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
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        loading={loading}
        onCellEditStop={handleCellEdit}
      />
    </div>
  );
};

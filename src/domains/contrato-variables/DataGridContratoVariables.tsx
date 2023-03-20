import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { ContratoRepository } from '@domains/contrato/repository';
import ContratoVariablesRepository from './repository/contrato-variables.repository';

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
    type: 'string',
    width: 110,
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
      setRefreshData(false);
    });
  }, [contratoId, refreshData]);

  const handleCellEdit = (params: any, event: any) => {
    setLoading(true);
    const { row, id } = params;

    row['valor'] = event.target.value;

    ContratoVariablesRepository.updateContratoVariable(row, id)
      .then(({ status }) => {
        // console.log('status', status === 201 );

        setRefreshData(true);
        setLoading(false);
      })
      .catch((error: any) => {
        // TODO falta un handlerError() que sustituya el console.log
        console.log('Error al actualizar variable:\n', error);
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

import { useEffect } from 'react';
import { GridCellEditStopReasons, GridEventListener, useGridApiRef } from '@mui/x-data-grid';

import { ContratoRepository } from '@domains/contrato/repository';
import ContratoVariablesRepository from './repository/contrato-variables.repository';

import { DataGrid } from '@app/components/DataGrid';

import { useDataGrid } from '@app/hooks';

export const DataGridContratoVariables = ({ contratoId }: { contratoId: string | undefined }) => {
  const apiRef = useGridApiRef();

  const mainDataGrid = useDataGrid();

  useEffect(() => {
    mainDataGrid.load({ fixedFilters: { contratoId } });
  }, [mainDataGrid]);

  const handleCellEditStop: GridEventListener<'cellEditStop'> = (params, event) => {
    if (params.reason === GridCellEditStopReasons.cellFocusOut) {
      // Si es true, la celda que da en modo edicion hasta que presionen Enter, Tab o Esc
      event.defaultMuiPrevented = false;
    }

    const row = apiRef.current.getRowWithUpdatedValues(params.id, params.field);

    ContratoVariablesRepository.updateContratoVariable({ valor: row?.valor }, params.id)
      .then
      // response => console.log('response', response)
      ()
      .catch((error: AnyValue) => {
        console.log('Error al actualizar variable:\n', error);
      })
      .finally(() => {
        mainDataGrid.load({ fixedFilters: { contratoId } });
      });
  };

  // const handleProcessRowUpdateError = (error: AnyValue) => {
  //   console.error('handleProcessRowUpdateError');
  //   console.log(error);
  // };

  return (
    <DataGrid
      repositoryFunc={ContratoRepository.variablesPorContratoProcedimientoQ}
      hookRef={mainDataGrid.ref}
      apiRef={apiRef}
      columns={[
        {
          field: 'procedimientoQ.conceptoAcuerdo.descripcion',
          headerName: 'Nombre del Concepto Acuerdo',
          description: 'This column has some type value.',
          sortable: false,
          valueGetter: (params: AnyValue) => {
            return params.row.procedimientoQ?.conceptoAcuerdo?.descripcion || ' ';
          },
        },
        {
          field: 'procedimientoQ.denominacion',
          headerName: 'Nombre Procedimiento Cantidad',
          valueGetter: (params: AnyValue) => {
            return params.row.procedimientoQ?.denominacion || ' ';
          },
        },
        { field: 'codigo', headerName: 'Codigo Variable' },
        {
          field: 'procedimientoQ.procedimientoBuiltin.procedimientoBuiltinVariables.nombre',
          headerName: 'Nombre Variable',
          valueGetter: (params: AnyValue) => {
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
      onCellEditStop={handleCellEditStop}
      // processRowUpdate={(updatedRow, originalRow) => {
      //   apiRef.current.stopCellEditMode({ id: updatedRow.id, field: 'valor' });
      //   console.log('updatedRow', updatedRow);
      // }}
      // onProcessRowUpdateError={handleProcessRowUpdateError}
    />
  );
};

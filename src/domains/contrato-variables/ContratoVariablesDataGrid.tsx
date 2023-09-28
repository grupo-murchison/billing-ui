import { useEffect } from 'react';
import { GridCellEditStopReasons, GridEventListener, useGridApiRef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';

import { ContratoRepository } from '@domains/contrato/repository';
import ContratoVariablesRepository from './repository/contrato-variables.repository';

import { DataGrid } from '@app/components/DataGrid';

import { useDataGrid } from '@app/hooks';
import { Button } from '@mui/material';
import { Controller } from 'react-hook-form';

type ContratoVariablesDataGridProps = {
  contratoId: string | undefined;
  resetField: AnyValue;
  apiRef?: React.MutableRefObject<GridApiCommunity> | undefined;
};

export const ContratoVariablesDataGrid = ({ contratoId, resetField }: ContratoVariablesDataGridProps) => {
  const apiRef = useGridApiRef();

  const mainDataGrid = useDataGrid();

  useEffect(() => {
    mainDataGrid.load({ fixedFilters: { contratoId } });
  }, [contratoId]);

  const handleCellEditStop: GridEventListener<'cellEditStop'> = (params, event) => {
    if (params.reason === GridCellEditStopReasons.cellFocusOut) {
      // Si es true, la celda que da en modo edicion hasta que presionen Enter, Tab o Esc
      event.defaultMuiPrevented = false;
    }
  };

  const updateDataGridValor = () => {
    const rows = apiRef.current.getSortedRows();

    const variables = rows.map((row: AnyValue) => {
      return { id: row?.id, codigo: row?.codigo, valor: row?.valor };
    });

    resetField('contratoVariables', { defaultValues: variables });

    console.log('variables', variables);

    // ContratoVariablesRepository.updateContratoVariables(variables)
    //   .then
    //   // response => console.log('response', response)
    //   ()
    //   .catch((error: AnyValue) => {
    //     console.log('Error al actualizar variable:\n', error);
    //   })
    //   .finally(() => {
    //     mainDataGrid.load({ fixedFilters: { contratoId } });
    //   });
  };

  // const handleProcessRowUpdateError = (error: AnyValue) => {
  //   console.error('handleProcessRowUpdateError');
  //   console.log(error);
  // };

  return (
    <>
      <Button onClick={updateDataGridValor}>Guardar</Button>
      <DataGrid
        repositoryFunc={ContratoRepository.variablesPorContratoProcedimientoQ}
        hookRef={mainDataGrid.ref}
        apiRef={apiRef}
        columns={[
          {
            field: 'id',
            headerName: 'ID',
            sortable: false,
            maxWidth: 90,
          },
          {
            field: 'procedimientoQ.conceptoAcuerdo.descripcion',
            headerName: 'Nombre del Concepto Acuerdo',
            description: 'This column has some type value.',
            sortable: false,
            valueGetter: ({ row }) => {
              return row.procedimientoQ?.conceptoAcuerdo?.descripcion || '';
            },
          },
          {
            field: 'procedimientoQ.denominacion',
            headerName: 'Nombre Procedimiento Cantidad',
            valueGetter: ({ row }) => {
              return row.procedimientoQ?.denominacion || '';
            },
          },
          { field: 'codigo', headerName: 'Codigo Variable' },
          {
            field: 'procedimientoQ.procedimientoBuiltin.procedimientoBuiltinVariables.nombre',
            headerName: 'Nombre Variable',
            valueGetter: ({ row }) => {
              return row.procedimientoQ?.procedimientoBuiltin?.procedimientoBuiltinVariables?.nombre || '';
            },
          },
          {
            field: 'valor',
            headerName: 'Valor',
            type: 'string',
            editable: true,
            // renderCell:
            // renderEditCell:
          },
        ]}
        onCellEditStop={handleCellEditStop}
        // processRowUpdate={(updatedRow, originalRow) => {
        //   apiRef.current.stopCellEditMode({ id: updatedRow.id, field: 'valor' });
        //   console.log('updatedRow', updatedRow);
        // }}
        // onProcessRowUpdateError={handleProcessRowUpdateError}
      />
    </>
  );
};

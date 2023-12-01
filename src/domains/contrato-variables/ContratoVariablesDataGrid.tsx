import {
  GridCellEditStopReasons,
  GridCellParams,
  GridColDef,
  GridEventListener,
  GridRowsProp,
  useGridApiRef,
} from '@mui/x-data-grid';

import ContratoVariablesRepository from './repository/contrato-variables.repository';

import { FieldErrors } from 'react-hook-form';
import DataGridBase from '@app/components/DataGrid/DataGridBase';

type ContratoVariablesDataGridProps = {
  contratoId?: string | undefined;
  errors: FieldErrors;
  name: string;
  rows: GridRowsProp;
  setValue?: AnyValue;
};

export const ContratoVariablesDataGrid = ({ name, errors, rows, setValue }: ContratoVariablesDataGridProps) => {
  const apiRef = useGridApiRef();

  const handleCellEditStop: GridEventListener<'cellEditStop'> = (params, event) => {
    if (params.reason === GridCellEditStopReasons.cellFocusOut) {
      // Si es true, la celda que da en modo edicion hasta que presionen Enter, Tab o Esc
      event.defaultMuiPrevented = false;
    }
    updateDataGridValor(params);
  };

  const updateDataGridValor = (params: GridCellParams) => {
    const row = apiRef.current.getRowWithUpdatedValues(params.id, params.field);
    const sortedRows = apiRef.current.getSortedRows();

    sortedRows.forEach(x => {
      if (x.id === row.id) x.valor = row.valor;
    });

    ContratoVariablesRepository.updateContratoVariables(sortedRows)
      .then(response => console.log('response', response))
      .catch((error: AnyValue) => {
        console.log('Error al actualizar variable:\n', error);
      })
      .finally(() => {
        setValue(name, sortedRows);
      });
  };

  // const handleProcessRowUpdateError = (error: AnyValue) => {
  //   console.error('handleProcessRowUpdateError');
  //   console.log(error);
  // };

  const columns: GridColDef[] = [
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
    },
  ];

  console.log('contrato variables errors', errors);

  return (
    <>
      <DataGridBase
        apiRef={apiRef}
        rows={rows}
        columns={columns}
        onCellEditStop={handleCellEditStop}
        // processRowUpdate={(updatedRow, originalRow) => {
        //   // apiRef.current.stopCellEditMode({ id: updatedRow.id, field: 'valor' });
        //   console.log('updatedRow', updatedRow);
        // }}
        // onProcessRowUpdateError={handleProcessRowUpdateError}
      />
    </>
  );
};

import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';
import { Button, Paper, Stack } from '@mui/material';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { ProcedimientoCustomRepository } from '@domains/procedimiento-custom/repository';
import { ProcedimientoCustomDataGridBreadcrumb, label } from '@domains/procedimiento-custom/constants';
import { ProcedimientoCustomContext } from '@domains/procedimiento-custom/contexts';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { DeleteOutlineIcon, EditOutlinedIcon, ViewIcon } from '@assets/icons';

const ProcedimientoCustomDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoCustomContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/procedimiento-custom/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-custom/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (row: any) => {
      confirmDialog.open({
        entity: `${label.procedimientoCustom}`,
        identifier: `${row.denominacion}`,
        async onClickYes() {
          await ProcedimientoCustomRepository.deleteProcedimientoCustomById(row.id);
          confirmDialog.close();
          mainDataGrid.reload();
        },
      });
    },
    [confirmDialog, mainDataGrid],
  );

  useEffect(() => {
    mainDataGrid.load();
  }, [mainDataGrid]);

  const toolbar = (
    <Stack sx={{ justifyContent: 'flex-end', marginBottom: 2 }} direction='row'>
      <Button onClick={handleClickCreate} color='primary' variant='contained'>
        Crear
      </Button>
    </Stack>
  );

  return (
    <>
      {toolbar}
      <Paper>
        <DataGrid
          hookRef={mainDataGrid.ref}
          columns={[
            { field: 'codigo', headerName: 'Código' },
            { field: 'denominacion', headerName: 'DENOMINACIÓN' },
            { field: 'funcion', headerName: 'TIPO FUNCIÓN' },
            { field: 'accion', headerName: 'ACCIÓN' },
            { field: 'evento', headerName: 'EVENTO' },
            { field: 'eventoCampo', headerName: 'CAMPO' },
            { field: 'expresionFiltro', headerName: 'Expresión Filtro' },
            {
              field: 'actions',
              type: 'actions',
              headerName: 'Acciones',
              headerAlign: 'center',
              align: 'center',
              flex: 0.5,
              getActions: params => [
                <GridActionsCellItem
                  key={2}
                  icon={<EditOutlinedIcon />}
                  label='Editar'
                  onClick={() => handleClickEdit(params.row.id)}
                  showInMenu
                />,
                <GridActionsCellItem
                  key={3}
                  icon={<DeleteOutlineIcon />}
                  label='Eliminar'
                  onClick={() => handleClickDelete(params.row)}
                  showInMenu
                />,
              ],
            },
          ]}
          repositoryFunc={ProcedimientoCustomRepository.getAllProcedimientoCustomPaginated}
        />
      </Paper>
      <Outlet />
    </>
  );
};

export default withBreadcrumb(ProcedimientoCustomDataGrid, ProcedimientoCustomDataGridBreadcrumb);

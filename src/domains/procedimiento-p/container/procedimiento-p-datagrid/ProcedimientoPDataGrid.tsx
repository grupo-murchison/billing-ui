import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';
import { Button, Paper, Stack } from '@mui/material';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { ProcedimientoPRepository } from '@domains/procedimiento-p/repository';
import { ProcedimientoPDataGridBreadcrumb, labelAndPath } from '@domains/procedimiento-p/constants';
import { ProcedimientoPContext } from '@domains/procedimiento-p/contexts';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { DeleteOutlineIcon, EditOutlinedIcon, ViewIcon } from '@assets/icons';

const ProcedimientoPDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoPContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/procedimiento-p/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-p/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickView = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-p/${id}`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (row: any) => {
      confirmDialog.open({
        entity: `${labelAndPath.label}`,
        identifier: `${row.codigo}`,
        async onClickYes() {
          await ProcedimientoPRepository.deleteProcedimientoPById(row.id);
          confirmDialog.close();
          mainDataGrid.reload();
        },
      });
    },
    [confirmDialog],
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
            { field: 'codigo', headerName: 'CÓDIGO' },
            { field: 'denominacion', headerName: 'DENOMINACIÓN' },
            { field: 'moneda', headerName: 'MONEDA' },
            {
              field: 'actions',
              type: 'actions',
              headerName: 'Acciones',
              headerAlign: 'center',
              align: 'center',
              flex: 0.5,
              getActions: params => [
                <GridActionsCellItem
                  key={1}
                  icon={<ViewIcon />}
                  label='Vista'
                  onClick={() => handleClickView(params.row.id)}
                  showInMenu
                />,
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
          repositoryFunc={ProcedimientoPRepository.getAllProcedimientoPPaginated}
        />
      </Paper>
      <Outlet />
    </>
  );
};

export default withBreadcrumb(ProcedimientoPDataGrid, ProcedimientoPDataGridBreadcrumb);

import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';
import { Button, Paper, Stack } from '@mui/material';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { ProductoSoftlandRepository } from '@domains/producto-softland/repository';
import { ProductoSoftlandDataGridBreadcrumb, labelAndPath } from '@domains/producto-softland/constants';
import { ProductoSoftlandContext } from '@domains/producto-softland/contexts';

import { DateLib } from '@libs';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { AddIcon, DeleteOutlineIcon, EditOutlinedIcon } from '@assets/icons';

const ProductoSoftlandDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProductoSoftlandContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/producto-softland/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/producto-softland/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (row: any) => {
      confirmDialog.open({
        entity: `${labelAndPath.label}`,
        identifier: `${row.codigo}`,
        async onClickYes() {
          await ProductoSoftlandRepository.deleteProductoSoftlandById(row.id);
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
        <AddIcon />
        Alta
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
            { field: 'agrupacion', headerName: 'AGRUPACIÓN' },
            { field: 'codigo', headerName: 'CÓDIGO' },
            { field: 'descripcion', headerName: 'DESCRIPCIÓN' },
            { field: 'activo', headerName: 'ACTIVO', valueGetter: params => (params.value ? 'SI' : 'NO') },
            {
              field: 'fechaCambioEstado',
              headerName: 'FECHA ACTIVO',
              valueGetter: params => DateLib.parseFromDBString(params.value),
              type: 'date',
            },
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
          repositoryFunc={ProductoSoftlandRepository.getAllProductoSoftlandPaginated}
        />
      </Paper>
      <Outlet />
    </>
  );
};

export default withBreadcrumb(ProductoSoftlandDataGrid, ProductoSoftlandDataGridBreadcrumb);

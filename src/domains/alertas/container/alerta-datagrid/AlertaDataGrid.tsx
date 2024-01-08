import { useCallback, useContext, useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { GridActionsCellItem } from '@mui/x-data-grid';
import { DeleteOutlineIcon, EditOutlinedIcon, ViewIcon } from '@assets/icons';
import { EventoContext } from '@domains/evento/contexts';
import { EventoRepository } from '@domains/evento/repository';
import { EventoDataGridBreadcrumb, labelAndPath } from '@domains/evento/constants';

const AlertaDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(EventoContext);
  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/evento/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/evento/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickView = useCallback(
    (id: number) => {
      _navigate(`/evento/${id}`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (row: AnyValue) => {
      confirmDialog.open({
        entity: `${labelAndPath.label}`,
        identifier: `${row.codigo}`,
        type: 'delete',
        async onClickYes() {
          await EventoRepository.deleteEventoById(row.id).then(() => {
            confirmDialog.close()
            mainDataGrid.reload();
          }).catch(error => {

            confirmDialog.open({
              type: 'reject',
              title: 'No es posible realizar esta acción',
              message: `${JSON.parse(error.message).message}`,
              onClickYes() {
                confirmDialog.close()
              }
            })
          });
        },
      });
    },
    [confirmDialog],
  );


  useEffect(() => {
    mainDataGrid.load();
  }, [mainDataGrid]);

  return (
    <>
      <DataGrid
        onClickNew={handleClickCreate}
        hookRef={mainDataGrid.ref}
        columns={[
          { field: 'codigo', headerName: 'Código' },
          { field: 'denominacion', headerName: 'Denominación' },
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
        repositoryFunc={EventoRepository.getAllEventoPaginated}
      />
      <Outlet />
    </>
  );
};

export default withBreadcrumb(AlertaDataGrid, EventoDataGridBreadcrumb);

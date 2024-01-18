import { useCallback, useContext, useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import { withBreadcrumb } from '@app/hocs';
// import { useConfirmDialog } from '@app/hooks';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { GridActionsCellItem } from '@mui/x-data-grid';
import { EditOutlinedIcon, ViewIcon } from '@assets/icons';
import { EventoContext } from '@domains/evento/contexts';
import { AlertaRepository } from '@domains/alertas/repository';
import { AlertaDataGridBreadcrumb, labelAndPath } from '@domains/alertas/constants';
import { AlertaContext } from '@domains/alertas/contexts';

const AlertaDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(AlertaContext);
  // const confirmDialog = useConfirmDialog();

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

  // const handleClickDelete = useCallback(
  //   (row: AnyValue) => {
  //     confirmDialog.open({
  //       entity: `${labelAndPath.label}`,
  //       identifier: `${row.codigo}`,
  //       type: 'delete',
  //       async onClickYes() {
  //         await AlertaRepository.deleteEventoById(row.id).then(() => {
  //           confirmDialog.close()
  //           mainDataGrid.reload();
  //         }).catch(error => {

  //           confirmDialog.open({
  //             type: 'reject',
  //             title: 'No es posible realizar esta acción',
  //             message: `${JSON.parse(error.message).message}`,
  //             onClickYes() {
  //               confirmDialog.close()
  //             }
  //           })
  //         });
  //       },
  //     });
  //   },
  //   [confirmDialog],
  // );


  useEffect(() => {
    mainDataGrid.load();
  }, [mainDataGrid]);

  return (
    <>
      <DataGrid
        onClickNew={handleClickCreate}
        hookRef={mainDataGrid.ref}
        columns={[
          { field: 'source_system', headerName: 'Evento Origen' },
          { field: 'Tipo Evento', headerName: 'Tipo Evento' },
          { field: 'createdDate', headerName: 'Tipo Evento' },
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
              // <GridActionsCellItem
              //   key={3}
              //   icon={<DeleteOutlineIcon />}
              //   label='Eliminar'
              //   onClick={() => handleClickDelete(params.row)}
              //   showInMenu
              // />,
            ],
          },
        ]}
        repositoryFunc={AlertaRepository.getAllEventoPaginated}
      />
      <Outlet />
    </>
  );
};

export default withBreadcrumb(AlertaDataGrid, AlertaDataGridBreadcrumb);

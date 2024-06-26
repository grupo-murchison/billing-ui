import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { TablaDinamicaContext } from '../../contexts';
import TablaDinamicaRepository from '../../repository/tabla-dinamica.repository';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { DeleteOutlineIcon, EditOutlinedIcon, ViewIcon } from '@assets/icons';
import { TablaDinamicaDataGridBreadcrumb, labelAndPath } from '../../constants';
import { useToastContext } from '@app/components/Toast/ToastProvider';

const TablaDinamicaDatagrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(TablaDinamicaContext);

  const confirmDialog = useConfirmDialog();
  const { showToast } = useToastContext();

  const handleClickCreate = useCallback(() => {
    _navigate('/tabla-dinamica/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/tabla-dinamica/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickView = useCallback(
    (id: number) => {
      _navigate(`/tabla-dinamica/${id}`);
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
          await TablaDinamicaRepository.deleteTablaDinamicaById(row.id)
            .then(() => {
              showToast({ message: 'Tabla dinámica eliminada correctamente' });
              confirmDialog.close();
              mainDataGrid.reload();
            })
            .catch(err => {
              const error = JSON.parse(err.message);
              if (error.statusCode === 400) {
                confirmDialog.open({
                  message: error.message,
                  type: 'reject',
                  async onClickYes() {
                    confirmDialog.close();
                  },
                });
              }
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
          { field: 'nombre', headerName: 'Nombre' },
          { field: 'descripcion', headerName: 'Descripción' },
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
        repositoryFunc={TablaDinamicaRepository.getAllTablaDinamicaPaginated}
      />

      <Outlet />
    </>
  );
};

export default withBreadcrumb(TablaDinamicaDatagrid, TablaDinamicaDataGridBreadcrumb);

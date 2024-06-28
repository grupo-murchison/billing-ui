import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { ProcedimientoPRepository } from '@domains/procedimiento-p/repository';
import { ProcedimientoPDataGridBreadcrumb, labelAndPath } from '@domains/procedimiento-p/constants';
import { ProcedimientoPContext } from '@domains/procedimiento-p/contexts';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { DeleteOutlineIcon, EditOutlinedIcon, ViewIcon } from '@assets/icons';
import { useToastContext } from '@app/components/Toast/ToastProvider';

const ProcedimientoPDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoPContext);

  const confirmDialog = useConfirmDialog();
  const { showToast } = useToastContext();

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
    (row: AnyValue) => {
      confirmDialog.open({
        entity: `${labelAndPath.label}`,
        identifier: `${row.codigo}`,
        type: 'delete',
        async onClickYes() {
          await ProcedimientoPRepository.deleteProcedimientoPById(row.id)
            .then(() => {
              showToast({ message: 'Procedimiento Precio eliminado correctamente' });
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
          { field: 'denominacion', headerName: 'Denominación' },
          { field: 'moneda', headerName: 'Moneda' },
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

      <Outlet />
    </>
  );
};

export default withBreadcrumb(ProcedimientoPDataGrid, ProcedimientoPDataGridBreadcrumb);

import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { ProcedimientoQRepository } from '@domains/procedimiento-q/repository';
import { ProcedimientoQDataGridBreadcrumb } from '@domains/procedimiento-q/constants';
import { ProcedimientoQContext } from '@domains/procedimiento-q/contexts';
import { label } from '@domains/procedimiento-q/constants';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { DeleteOutlineIcon, EditOutlinedIcon, ViewIcon } from '@assets/icons';

const ProcedimientoQDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoQContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/procedimiento-q/create');
  }, [_navigate]);

  const handleClickView = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-q/${id}`);
    },
    [_navigate],
  );

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-q/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (row: AnyValue) => {
      confirmDialog.open({
        entity: `${label.procedimientoQ}`,
        identifier: `${row.codigo}`,
        async onClickYes() {
          await ProcedimientoQRepository.deleteProcedimientoQById(row.id);
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

  return (
    <>
      <DataGrid
        onClickNew={handleClickCreate}
        hookRef={mainDataGrid.ref}
        columns={[
          { field: 'codigo', headerName: 'Código' },
          { field: 'denominacion', headerName: 'Denominación' },
          // { headerName: 'Descripción' },
          { field: 'tipoProcedimientoQ', headerName: 'Tipo Procedimiento Cantidad' },
          { field: 'procedimientoBuiltin', headerName: 'Procedimiento Builtin' },
          { field: 'procedimientoCustom', headerName: 'Procedimiento Custom' },
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
        repositoryFunc={ProcedimientoQRepository.getAllProcedimientoQPaginated}
      />

      <Outlet />
    </>
  );
};

export default withBreadcrumb(ProcedimientoQDataGrid, ProcedimientoQDataGridBreadcrumb);

import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { ProcedimientoCustomRepository } from '@domains/procedimiento-custom/repository';
import { ProcedimientoCustomDataGridBreadcrumb, label } from '@domains/procedimiento-custom/constants';
import { ProcedimientoCustomContext } from '@domains/procedimiento-custom/contexts';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { DeleteOutlineIcon, EditOutlinedIcon } from '@assets/icons';

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
    (row: AnyValue) => {
      confirmDialog.open({
        entity: `${label.procedimientoCustom}`,
        identifier: `${row.denominacion}`,
        type: 'delete',
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

  return (
    <>
      <DataGrid
        onClickNew={handleClickCreate}
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

      <Outlet />
    </>
  );
};

export default withBreadcrumb(ProcedimientoCustomDataGrid, ProcedimientoCustomDataGridBreadcrumb);

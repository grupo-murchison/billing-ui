import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { ModeloAcuerdoRepository } from '@domains/modelo-acuerdo/repository';
import { ModeloAcuerdoDataGridBreadcrumb, ModeloAcuerdoLabelAndPath } from '@domains/modelo-acuerdo/constants';
import { ModeloAcuerdoContext } from '@domains/modelo-acuerdo/contexts';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { EditOutlinedIcon, DeleteOutlineIcon } from '@assets/icons';

const ModeloAcuerdoDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ModeloAcuerdoContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/modelo-acuerdo/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/modelo-acuerdo/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    //TODO: tipar o buscar si existe para rows de Modelo Acuerdo
    (row: any) => {
      confirmDialog.open({
        entity: `${ModeloAcuerdoLabelAndPath.label}`,
        identifier: `${row.codigo}`,
        async onClickYes() {
          await ModeloAcuerdoRepository.deleteModeloAcuerdoById(row.id);
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

  return (
    <>
      <DataGrid
        onClickNew={handleClickCreate}
        hookRef={mainDataGrid.ref}
        columns={[
          { field: 'codigo', headerName: 'CÓDIGO' },
          { field: 'nombre', headerName: 'NOMBRE' },
          { field: 'descripcion', headerName: 'DESCRIPCIÓN' },
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
        repositoryFunc={ModeloAcuerdoRepository.getAllModeloAcuerdoPaginated}
      />

      <Outlet />
    </>
  );
};

export default withBreadcrumb(ModeloAcuerdoDataGrid, ModeloAcuerdoDataGridBreadcrumb);

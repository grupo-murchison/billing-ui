import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { TablasDinamicasContext } from '../../contexts';
import TablasDinamicasRepository from '../../repository/tablas-dinamicas.repository';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { DeleteOutlineIcon, EditOutlinedIcon, ViewIcon } from '@assets/icons';
import { TablasDinamicasDataGridBreadcrumb, labelAndPath } from '../../constants';

const TablasDinamicasDatagrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(TablasDinamicasContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/tablas-dinamicas/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/tablas-dinamicas/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickView = useCallback(
    (id: number) => {
      _navigate(`/tablas-dinamicas/${id}`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (row: AnyValue) => {
      confirmDialog.open({
        entity: `${labelAndPath.label}`,
        identifier: `${row.nombreTabla}`,
        type: 'delete',
        async onClickYes() {
          await TablasDinamicasRepository.deleteTablasDinamicasById(row.id);
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
          { field: 'nombreTabla', headerName: 'Nombre' },
          { field: 'descripcionTabla', headerName: 'Descripción' },
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
        repositoryFunc={TablasDinamicasRepository.getAllTablasDinamicasPaginated}
      />

      <Outlet />
    </>
  );
};

export default withBreadcrumb(TablasDinamicasDatagrid, TablasDinamicasDataGridBreadcrumb);

import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet, useParams } from 'react-router-dom';

import { useConfirmDialog } from '@app/hooks';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { DatosDinamicosContext } from '../../contexts';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { DeleteOutlineIcon, EditOutlinedIcon } from '@assets/icons';
import { labelAndPath } from '../../constants';
import DatosDinamicosRepository from '../../repository/datos-dinamicos.repository';

const DatosDinamicosDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(DatosDinamicosContext);
  const { tablaId } = useParams();

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate(`/tablas-dinamicas/${tablaId}/datos-dinamicos/create`);
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/tablas-dinamicas/${tablaId}/datos-dinamicos/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (row: AnyValue) => {
      confirmDialog.open({
        entity: `${labelAndPath.label}`,
        identifier: `${row.campoCodigo}`,
        type: 'delete',
        async onClickYes() {
          await DatosDinamicosRepository.deleteDatosDinamicosById(row.id);
          confirmDialog.close();
          mainDataGrid.reload();
        },
      });
    },
    [confirmDialog],
  );

  useEffect(() => {
    mainDataGrid.load({
      fixedFilters: {
        tablaId: tablaId,
      },
    });
  }, [mainDataGrid, tablaId]);

  return (
    <>
      <DataGrid
        onClickNew={handleClickCreate}
        hookRef={mainDataGrid.ref}
        columns={[
          { field: 'campoCodigo', headerName: 'Código' },
          { field: 'campoValor', headerName: 'Valor' },
          { field: 'activo', headerName: 'Activo', valueGetter: params => (params.value ? 'Si' : 'No') },
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
        repositoryFunc={DatosDinamicosRepository.getAllDatosDinamicosPaginated}
      />
      <Outlet />
    </>
  );
};

export default DatosDinamicosDataGrid;

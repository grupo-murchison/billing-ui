import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet, useParams, useLocation } from 'react-router-dom';

import { useConfirmDialog } from '@app/hooks';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { DatoDinamicoContext } from '../../contexts';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { DeleteOutlineIcon, EditOutlinedIcon, ViewIcon } from '@assets/icons';
import { labelAndPath } from '../../constants';
import DatoDinamicoRepository from '../../repository/dato-dinamico.repository';

const DatoDinamicoDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(DatoDinamicoContext);
  const { tablaDinamicaId } = useParams();
  const url = useLocation();
  const canEdit = url?.pathname?.includes('edit') ? true : false;

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate(`/tabla-dinamica/${tablaDinamicaId}/edit/dato-dinamico/create`);
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/tabla-dinamica/${tablaDinamicaId}/edit/dato-dinamico/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickView = useCallback(
    (id: number) => {
      if (canEdit) {
        _navigate(`/tabla-dinamica/${tablaDinamicaId}/edit/dato-dinamico/${id}`);
      } else {
        _navigate(`/tabla-dinamica/${tablaDinamicaId}/dato-dinamico/${id}`);
      }
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
          await DatoDinamicoRepository.deleteDatoDinamicoById(row.id);
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
        tablaDinamicaId: tablaDinamicaId,
      },
    });
  }, [mainDataGrid, tablaDinamicaId]);

  return (
    <>
      <DataGrid
        onClickNew={canEdit ? handleClickCreate : undefined}
        hookRef={mainDataGrid.ref}
        columns={[
          { field: 'codigo', headerName: 'Código' },
          { field: 'valor', headerName: 'Valor' },
          { field: 'activo', headerName: 'Activo', valueGetter: params => (params.value ? 'Si' : 'No') },
          {
            field: 'acciones',
            type: 'actions',
            headerName: 'Acciones',
            headerAlign: 'center',
            align: 'center',
            flex: 0.5,
            getActions: params => {
              return [
                <>
                  <GridActionsCellItem
                    key={1}
                    icon={<ViewIcon />}
                    label='Vista'
                    onClick={() => handleClickView(params.row.id)}
                  />
                  {canEdit && (
                    <>
                      <GridActionsCellItem
                        key={2}
                        icon={<EditOutlinedIcon />}
                        label='Editar'
                        onClick={() => handleClickEdit(params.row.id)}
                      />
                      <GridActionsCellItem
                        key={3}
                        icon={<DeleteOutlineIcon />}
                        label='Eliminar'
                        onClick={() => handleClickDelete(params.row)}
                      />
                    </>
                  )}
                </>,
              ];
            },
          },
        ]}
        repositoryFunc={DatoDinamicoRepository.getAllDatoDinamicoPaginated}
      />
      <Outlet />
    </>
  );
};

export default DatoDinamicoDataGrid;

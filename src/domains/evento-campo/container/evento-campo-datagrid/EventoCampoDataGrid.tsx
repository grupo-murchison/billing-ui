import { useCallback, useContext, useEffect } from 'react';

import { EventoCampoRepository } from '@domains/evento-campo/repository';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { DeleteOutlineIcon, EditOutlinedIcon, ViewIcon } from '@assets/icons';
import { useConfirmDialog, useLocationMode } from '@app/hooks';
import { EventoCampoContext } from '@domains/evento-campo/contexts';
import { DataGrid } from '@app/components/DataGrid';

const EventoCampoDataGrid = () => {
  const _navigate = useNavigate();
  const { mainDataGrid } = useContext(EventoCampoContext);

  const { eventoId } = useParams();
  const { canEdit } = useLocationMode();

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate(`/evento/${eventoId}/edit/evento-campo/create`);
  }, [_navigate, eventoId]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/evento/${eventoId}/edit/evento-campo/${id}/edit`);
    },
    [_navigate, eventoId],
  );

  const handleClickView = useCallback(
    (id: number) => {
      if (canEdit) {
        _navigate(`/evento/${eventoId}/edit/evento-campo/${id}`);
      } else {
        _navigate(`/evento/${eventoId}/evento-campo/${id}`);
      }
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (row: AnyValue) => {
      confirmDialog.open({
        entity: `Evento`,
        identifier: `${row.codigo}`,
        type: 'delete',
        async onClickYes() {
          await EventoCampoRepository.deleteEventoCampoById(row.id);
          confirmDialog.close();
          mainDataGrid.reload();
        },
      });
    },
    [confirmDialog, mainDataGrid],
  );

  useEffect(() => {
    mainDataGrid.load({
      fixedFilters: {
        eventoId: eventoId,
      },
    });
  }, [mainDataGrid, eventoId]);

  return (
    <>
      <DataGrid
        onClickNew={canEdit ? handleClickCreate : undefined}
        hookRef={mainDataGrid.ref}
        repositoryFunc={EventoCampoRepository.getAllEventoCampoPaginated}
        columns={[
          {
            field: 'codigo',
            headerName: 'Código',
          },
          {
            field: 'descripcion',
            headerName: 'Descripción',
          },
          {
            field: 'denominacion',
            headerName: 'Denominación',
          },
          {
            field: 'campo',
            headerName: 'Campo',
          },
          {
            field: 'tipoDatoId',
            headerName: 'Tipo Dato',
            valueGetter: ({ row }) => row?.tipoDato?.codigo || '',
          },
          {
            field: 'tablaDinamicaId',
            headerName: 'Tabla Dinámica',
            valueGetter: ({ row }) => row?.tablaDinamica?.nombre || '',
          },
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
      />
      <Outlet />
    </>
  );
};

export default EventoCampoDataGrid;

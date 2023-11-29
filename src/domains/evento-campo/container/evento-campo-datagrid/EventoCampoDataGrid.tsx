import { useCallback, useContext, useEffect, useState } from 'react';

import { EventoCampoRepository } from '@domains/evento-campo/repository';
import { useNavigate, useParams } from 'react-router-dom';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { DeleteOutlineIcon, EditOutlinedIcon } from '@assets/icons';
import { useConfirmDialog } from '@app/hooks';
import { EventoCampoContext } from '@domains/evento-campo/contexts';
import { DataGrid } from '@app/components/DataGrid';


const EventoCampoDataGrid = (evento?: AnyValue) => {
  const _navigate = useNavigate();
  const { mainDataGrid } = useContext(EventoCampoContext);

  const { eventoId } = useParams();

  const confirmDialog = useConfirmDialog();
  
  const handleClickCreate = useCallback(() => {
    _navigate(`/evento/${eventoId}/evento-campo/create`);
  }, [_navigate, eventoId]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/evento/${eventoId}/evento-campo/${id}/edit`);
    },
    [_navigate, eventoId],
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
    <DataGrid
    onClickNew={handleClickCreate}
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
          field: 'acciones',
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
            />,
            <GridActionsCellItem
              key={3}
              icon={<DeleteOutlineIcon />}
              label='Eliminar'
              onClick={() => handleClickDelete(params.row)}
            />,
          ],
        },
      ]}
      
    />
  );
}

export default EventoCampoDataGrid;
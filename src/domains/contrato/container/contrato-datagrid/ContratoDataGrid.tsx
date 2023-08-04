import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';
import { Button, Paper, Stack } from '@mui/material';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { ContratoRepository } from '@domains/contrato/repository';
import { ContratoContext } from '@domains/contrato/contexts';
import { ContratoDataGridBreadcrumb } from '@domains/contrato/constants';
import { ContratoRowDataGridSchema } from '@domains/contrato/repository/contrato.schemas';
import { ContartoLabelAndPath } from '@domains/contrato/constants';

import { DateLib } from '@libs';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { AddIcon, DeleteOutlineIcon, EditOutlinedIcon } from '@assets/icons';

const ContratoDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ContratoContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/contrato/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (row: ContratoRowDataGridSchema) => {
      _navigate(`/contrato/${row.id}/edit`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (row: ContratoRowDataGridSchema) => {
      confirmDialog.open({
        entity: `${ContartoLabelAndPath.label}`,
        identifier: `${row.nroContrato}`,
        async onClickYes() {
          await ContratoRepository.deleteContratoById(row.id);
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

  const toolbar = (
    <Stack sx={{ justifyContent: 'flex-end', marginBottom: 2 }} direction='row'>
      <Button onClick={handleClickCreate} color='primary' variant='contained'>
        <AddIcon />
        Alta
      </Button>
    </Stack>
  );

  return (
    <>
      {toolbar}
      <Paper>
        <DataGrid
          hookRef={mainDataGrid.ref}
          columns={[
            { field: 'nroContrato', headerName: 'Nº Contrato' },
            { field: 'descripcion', headerName: 'Descripción' },
            { field: 'tipoContrato', headerName: 'Tipo Contrato' },
            { field: 'modeloAcuerdo', headerName: 'Modelo Acuerdo' },
            { field: 'cliente', headerName: 'Cliente' },
            {
              field: 'fechaInicioContrato',
              headerName: 'Fecha Inicio',
              valueGetter: params => DateLib.parseFromDBString(params.value),
              type: 'date',
            },
            {
              field: 'fechaFinContrato',
              headerName: 'Fecha Fin',
              valueGetter: params => DateLib.parseFromDBString(params.value),
              type: 'date',
            },
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
                  onClick={() => handleClickEdit(params.row)}
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
          repositoryFunc={ContratoRepository.getAllContratoPaginated}
        />
      </Paper>
      <Outlet />
    </>
  );
};

export default withBreadcrumb(ContratoDataGrid, ContratoDataGridBreadcrumb);

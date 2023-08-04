import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { Button, Paper, Stack } from '@mui/material';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { ConceptoAcuerdoContext } from '@domains/concepto-acuerdo/contexts';
import { ConceptoAcuerdoDataGridBreadcrumb } from '@domains/concepto-acuerdo/constants';
import { ConceptoAcuerdoRepository } from '@domains/concepto-acuerdo/repository';
import { ConceptoAcuerdoLabelAndPath } from '@domains/concepto-acuerdo/constants';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { DeleteOutlineIcon, EditOutlinedIcon } from '@assets/icons';

const ConceptoAcuerdoDataGrid = () => {
  const _navigate = useNavigate();
  const { modeloAcuerdoId } = useParams();

  const { mainDataGrid } = useContext(ConceptoAcuerdoContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/concepto-acuerdo/create');
  }, [_navigate, modeloAcuerdoId]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/concepto-acuerdo/${id}/edit`);
    },
    [_navigate, modeloAcuerdoId],
  );

  //TODO:  Obtener el valor con el nombre de la entidad de una constante,
  const handleClickDelete = useCallback(
    (row: any) => {
      confirmDialog.open({
        entity: `${ConceptoAcuerdoLabelAndPath.label}`,
        identifier: `${row.modeloAcuerdo}`,
        async onClickYes() {
          await ConceptoAcuerdoRepository.deleteConceptoAcuerdoById(row.id);
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
        idModeloAcuerdo: modeloAcuerdoId,
      },
    });
  }, [mainDataGrid, modeloAcuerdoId]);

  const toolbar = (
    <Stack sx={{ justifyContent: 'flex-end', marginBottom: 2 }} direction='row'>
      <Button onClick={handleClickCreate} color='primary' variant='contained'>
        Crear
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
            { field: 'modeloAcuerdo', headerName: 'MODELO ACUERDO' },
            { field: 'descripcion', headerName: 'DESCRIPCIÓN' },
            { field: 'tipoServicio', headerName: 'TIPO SERVICIO' },
            { field: 'procedimientoQ', headerName: 'Pocedimiento Cantidad' },
            { field: 'procedimientoP', headerName: 'Pocedimiento Precio' },
            { field: 'procedimientoProductoSoftland', headerName: 'Pocedimiento Producto Softland' },
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
          repositoryFunc={ConceptoAcuerdoRepository.getAllConceptoAcuerdoPaginated}
        />
      </Paper>
      <Outlet />
    </>
  );
};

export default withBreadcrumb(ConceptoAcuerdoDataGrid, ConceptoAcuerdoDataGridBreadcrumb);

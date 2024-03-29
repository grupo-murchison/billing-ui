import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, useParams, Outlet } from 'react-router-dom';

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

  const handleClickDelete = useCallback(
    (row: AnyValue) => {
      confirmDialog.open({
        entity: `${ConceptoAcuerdoLabelAndPath.label}`,
        identifier: `${row.modeloAcuerdo}`,
        type: 'delete',
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

  return (
    <>
      {/* {toolbar} */}
      <DataGrid
        onClickNew={handleClickCreate}
        hookRef={mainDataGrid.ref}
        columns={[
          { field: 'modeloAcuerdo', headerName: 'Modelo Acuerdo' },
          { field: 'descripcion', headerName: 'Descripción' },
          { field: 'tipoServicio', headerName: 'Tipo Servicio' },
          { field: 'procedimientoQ', headerName: 'Procedimiento Cantidad' },
          { field: 'procedimientoP', headerName: 'Procedimiento Precio' },
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
      <Outlet />
    </>
  );
};

export default withBreadcrumb(ConceptoAcuerdoDataGrid, ConceptoAcuerdoDataGridBreadcrumb);

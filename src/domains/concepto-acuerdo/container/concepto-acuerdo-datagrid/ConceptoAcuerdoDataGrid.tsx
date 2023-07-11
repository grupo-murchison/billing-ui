import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

import { Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/pro-components';

import { ConceptoAcuerdoContext } from '@domains/concepto-acuerdo/contexts';
import { ConceptoAcuerdoDataGridBreadcrumb } from '@domains/concepto-acuerdo/constants';
import { ConceptoAcuerdoRepository } from '@domains/concepto-acuerdo/repository';
import { ConceptoAcuerdoLabelAndPath } from '@domains/concepto-acuerdo/constants';

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
      console.log(ConceptoAcuerdoLabelAndPath);
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

  return (
    <>
      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            columnHeads={[
              { headerName: 'MODELO ACUERDO' },
              { headerName: 'DESCRIPCIÓN' },
              { headerName: 'TIPO SERVICIO' },
              { headerName: 'Pocedimiento Cantidad' },
              { headerName: 'Pocedimiento Precio' },
              { headerName: 'Pocedimiento Producto Softland' },
              { headerName: 'ACCIONES' },
            ]}
            repositoryFunc={ConceptoAcuerdoRepository.getAllConceptoAcuerdoPaginated}
            rowTemplate={row => (
              <>
                <td>{row.modeloAcuerdo}</td>
                <td>{row.descripcion}</td>
                <td>{row.tipoServicio}</td>
                <td>{row.procedimientoQ}</td>
                <td>{row.procedimientoP}</td>
                <td>{row.procedimientoProductoSoftland}</td>
                <td align='center'>
                  <Stack direction='row' justifyContent='center' spacing={1}>
                    <DataGrid.EditButton onClick={() => handleClickEdit(row.id)} />
                    <DataGrid.DeleteButton onClick={() => handleClickDelete(row)} />
                  </Stack>
                </td>
              </>
            )}
            onClickNew={handleClickCreate}
          />
        </Col>
      </Row>
      <Outlet />
    </>
  );
};

export default withBreadcrumb(ConceptoAcuerdoDataGrid, ConceptoAcuerdoDataGridBreadcrumb);

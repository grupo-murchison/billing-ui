import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, useParams, Outlet } from 'react-router-dom';

import { Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/pro-components';

import { ConceptoAcuerdoContext } from '@domains/concepto-acuerdo/contexts';
import { ConceptoAcuerdoDataGridBreadcrumb } from '@domains/concepto-acuerdo/constants';
import { ConceptoAcuerdoRepository } from '@domains/concepto-acuerdo/repository';

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
    (id: number) => {
      confirmDialog.open({
        message: 'Desea eliminar el registro?',
        async onClickYes() {
          await ConceptoAcuerdoRepository.deleteConceptoAcuerdoById(id);
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
              { label: 'MODELO ACUERDO' },
              { label: 'DESCRIPCIÓN' },
              { label: 'TIPO SERVICIO' },
              { label: 'Pocedimiento Cantidad' },
              { label: 'Pocedimiento Precio' },
              { label: 'Pocedimiento Producto Softland' },
              { label: '' },
              { label: '' },
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
                  <DataGrid.EditButton onClick={() => handleClickEdit(row.id)} />
                </td>
                <td align='center'>
                  <DataGrid.DeleteButton onClick={() => handleClickDelete(row.id)} />
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

import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import { DataGrid, Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DataGridEditButton, DataGridDeleteButton } from '@app/pro-components';

import { ModeloAcuerdoRepository } from '@domains/modelo-acuerdo/repository';
import { ModeloAcuerdoDataGridBreadcrumb } from '@domains/modelo-acuerdo/constants';
import { ModeloAcuerdoContext } from '@domains/modelo-acuerdo/contexts';

const ModeloAcuerdoDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ModeloAcuerdoContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/modelo-acuerdo/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/modelo-acuerdo/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (id: number) => {
      confirmDialog.open({
        message: 'Desea eliminar el registro?',
        async onClickYes() {
          await ModeloAcuerdoRepository.deleteModeloAcuerdoById(id);
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
      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            onClickNew={handleClickCreate}
            columnHeads={[
              { label: 'CÓDIGO' },
              { label: 'NOMBRE' },
              { label: 'DESCRIPCIÓN' },
              { label: '' },
              { label: '' },
            ]}
            repositoryFunc={ModeloAcuerdoRepository.getAllModeloAcuerdoPaginated}
            rowTemplate={row => (
              <>
                <td>{row.codigo}</td>
                <td>{row.nombre}</td>
                <td>{row.descripcion}</td>
                <td align='center'>
                  <DataGridEditButton onClick={() => handleClickEdit(row.id)} />
                </td>
                <td align='center'>
                  <DataGridDeleteButton onClick={() => handleClickDelete(row.id)} />
                </td>
              </>
            )}
          />
        </Col>
      </Row>
      <Outlet />
    </>
  );
};

export default withBreadcrumb(ModeloAcuerdoDataGrid, ModeloAcuerdoDataGridBreadcrumb);

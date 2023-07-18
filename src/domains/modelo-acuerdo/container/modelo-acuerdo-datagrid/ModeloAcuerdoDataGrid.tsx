import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

import { Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/pro-components';

import { ModeloAcuerdoRepository } from '@domains/modelo-acuerdo/repository';
import { ModeloAcuerdoDataGridBreadcrumb, ModeloAcuerdoLabelAndPath } from '@domains/modelo-acuerdo/constants';
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
    //TODO: tipar o buscar si existe para rows de Modelo Acuerdo
    (row: any) => {
      confirmDialog.open({
        entity: `${ModeloAcuerdoLabelAndPath.label}`,
        identifier: `${row.codigo}`,
        async onClickYes() {
          await ModeloAcuerdoRepository.deleteModeloAcuerdoById(row.id);
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
              { headerName: 'CÓDIGO' },
              { headerName: 'NOMBRE' },
              { headerName: 'DESCRIPCIÓN' },
              { headerName: 'ACCIONES' },
            ]}
            repositoryFunc={ModeloAcuerdoRepository.getAllModeloAcuerdoPaginated}
            rowTemplate={row => (
              <>
                <td>{row.codigo}</td>
                <td>{row.nombre}</td>
                <td>{row.descripcion}</td>
                <td align='center'>
                  <Stack direction='row' justifyContent='center' spacing={1}>
                    <DataGrid.EditButton onClick={() => handleClickEdit(row.id)} />
                    <DataGrid.DeleteButton onClick={() => handleClickDelete(row)} />
                  </Stack>
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

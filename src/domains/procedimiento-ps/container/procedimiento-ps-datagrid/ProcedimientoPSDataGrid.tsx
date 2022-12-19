import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import { DataGrid, Portlet, Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DataGridEditButton, DataGridDeleteButton } from '@app/pro-components';

import { ProcedimientoPSRepository } from '@domains/procedimiento-ps/repository';
import { ProcedimientoPSDataGridBreadcrumb } from '@domains/procedimiento-ps/constants';
import { ProcedimientoPSContext } from '@domains/procedimiento-ps/contexts';

const ProcedimientoPSDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoPSContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/procedimiento-ps/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-ps/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (id: number) => {
      confirmDialog.open({
        message: 'Desea eliminar el registro?',
        async onClickYes() {
          await ProcedimientoPSRepository.deleteProcedimientoPSById(id);
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
    <Portlet>
      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            columnHeads={[{ label: 'CÓDIGO' }, { label: 'DENOMINACIÓN' }, { label: '' }, { label: '' }]}
            repositoryFunc={ProcedimientoPSRepository.getAllProcedimientoPSPaginated}
            rowTemplate={row => (
              <>
                <td>{row.codigo}</td>
                <td>{row.denominacion}</td>
                <td align='center'>
                  <DataGridEditButton onClick={() => handleClickEdit(row.id)} />
                </td>
                <td align='center'>
                  <DataGridDeleteButton onClick={() => handleClickDelete(row.id)} />
                </td>
              </>
            )}
            onClickNew={handleClickCreate}
          />
        </Col>
      </Row>
      <Outlet />
    </Portlet>
  );
};

export default withBreadcrumb(ProcedimientoPSDataGrid, ProcedimientoPSDataGridBreadcrumb);

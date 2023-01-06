import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import { DataGrid, Portlet, Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DataGridViewButton, DataGridEditButton, DataGridDeleteButton } from '@app/pro-components';

import { ProcedimientoPRepository } from '@domains/procedimiento-p/repository';
import { ProcedimientoPDataGridBreadcrumb } from '@domains/procedimiento-p/constants';
import { ProcedimientoPContext } from '@domains/procedimiento-p/contexts';

const ProcedimientoPDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoPContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/procedimiento-p/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-p/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickView = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-p/${id}`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (id: number) => {
      confirmDialog.open({
        message: 'Desea eliminar el registro?',
        async onClickYes() {
          await ProcedimientoPRepository.deleteProcedimientoPById(id);
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
            columnHeads={[
              { label: 'CÓDIGO' },
              { label: 'DENOMINACIÓN' },
              { label: 'MONEDA' },
              { label: '' },
              { label: '' },
              { label: '' },
            ]}
            repositoryFunc={ProcedimientoPRepository.getAllProcedimientoPPaginated}
            rowTemplate={row => (
              <>
                <td>{row.codigo}</td>
                <td>{row.denominacion}</td>
                <td>{row.moneda}</td>
                <td align='center'>
                  <DataGridViewButton onClick={() => handleClickView(row.id)} />
                </td>
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

export default withBreadcrumb(ProcedimientoPDataGrid, ProcedimientoPDataGridBreadcrumb);

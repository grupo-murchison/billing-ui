import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import { DataGrid, Portlet, Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DataGridViewButton, DataGridDeleteButton } from '@app/pro-components';

import { ProcedimientoQRepository } from '@domains/procedimiento-q/repository';
import { ProcedimientoQDataGridBreadcrumb } from '@domains/procedimiento-q/constants';
import { ProcedimientoQContext } from '@domains/procedimiento-q/contexts';

const ProcedimientoQDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoQContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/procedimiento-q/create');
  }, [_navigate]);

  const handleClickView = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-q/${id}`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (id: number) => {
      confirmDialog.open({
        message: 'Desea eliminar el registro?',
        async onClickYes() {
          await ProcedimientoQRepository.deleteProcedimientoQById(id);
          confirmDialog.close();
          mainDataGrid.reload();
        },
      });
    },
    [confirmDialog, mainDataGrid],
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
              { label: 'DESCRIPCIÓN' },
              { label: 'DENOMINACIÓN' },
              { label: 'TIPO PROC Q' },
              { label: 'PROC BUILTIN' },
              { label: 'PROC CUSTOM' },
              { label: '' },
              { label: '' },
            ]}
            repositoryFunc={ProcedimientoQRepository.getAllProcedimientoQPaginated}
            rowTemplate={row => (
              <>
                <td>{row.codigo}</td>
                <td>{row.descripcion}</td>
                <td>{row.denominacion}</td>
                <td>{row.tipoProcedimientoQ}</td>
                <td>{row.procedimientoBuiltin}</td>
                <td>{row.procedimientoCustom}</td>
                <td align='center'>
                  <DataGridViewButton onClick={() => handleClickView(row.id)} />
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

export default withBreadcrumb(ProcedimientoQDataGrid, ProcedimientoQDataGridBreadcrumb);

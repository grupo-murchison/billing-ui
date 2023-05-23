import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

import { Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/pro-components';

import { ProcedimientoCustomRepository } from '@domains/procedimiento-custom/repository';
import { ProcedimientoCustomDataGridBreadcrumb } from '@domains/procedimiento-custom/constants';
import { ProcedimientoCustomContext } from '@domains/procedimiento-custom/contexts';

const ProcedimientoCustomDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoCustomContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/procedimiento-custom/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-custom/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (id: number) => {
      confirmDialog.open({
        message: 'Desea eliminar el registro?',
        async onClickYes() {
          await ProcedimientoCustomRepository.deleteProcedimientoCustomById(id);
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
    <>
      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            columnHeads={[
              { label: 'DENOMINACIÓN' },
              { label: 'TIPO FUNCIÓN' },
              { label: 'ACCIÓN' },
              { label: 'EVENTO' },
              { label: 'CAMPO' },
              { label: '' },
            ]}
            repositoryFunc={ProcedimientoCustomRepository.getAllProcedimientoCustomPaginated}
            rowTemplate={row => (
              <>
                <td>{row.denominacion}</td>
                <td>{row.funcion}</td>
                <td>{row.accion}</td>
                <td>{row.evento}</td>
                <td>{row.eventoCampo}</td>
                <td align='center'>
                  <Stack direction='row' spacing={1}>
                    <DataGrid.EditButton onClick={() => handleClickEdit(row.id)} />
                    <DataGrid.DeleteButton onClick={() => handleClickDelete(row.id)} />
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

export default withBreadcrumb(ProcedimientoCustomDataGrid, ProcedimientoCustomDataGridBreadcrumb);

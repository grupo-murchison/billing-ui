import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

import { Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/pro-components';

import { ProcedimientoPSRepository } from '@domains/procedimiento-ps/repository';
import { ProcedimientoPSDataGridBreadcrumb, labelAndPath } from '@domains/procedimiento-ps/constants';
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

  const handleClickView = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-ps/${id}`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (row: any) => {
      confirmDialog.open({
        entity: `${labelAndPath.label}`,
        identifier: `${row.codigo}`,
        async onClickYes() {
          await ProcedimientoPSRepository.deleteProcedimientoPSById(row.id);
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
            columnHeads={[{ headerName: 'CÓDIGO' }, { headerName: 'DENOMINACIÓN' }, { headerName: '' }]}
            repositoryFunc={ProcedimientoPSRepository.getAllProcedimientoPSPaginated}
            rowTemplate={row => (
              <>
                <td>{row.codigo}</td>
                <td>{row.denominacion}</td>
                <td align='center'>
                  <Stack direction='row' justifyContent='center' spacing={1}>
                    <DataGrid.ViewButton onClick={() => handleClickView(row.id)} />
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

export default withBreadcrumb(ProcedimientoPSDataGrid, ProcedimientoPSDataGridBreadcrumb);

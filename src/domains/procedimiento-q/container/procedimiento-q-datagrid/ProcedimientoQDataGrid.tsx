import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

import { Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/pro-components';

import { ProcedimientoQRepository } from '@domains/procedimiento-q/repository';
import { ProcedimientoQDataGridBreadcrumb } from '@domains/procedimiento-q/constants';
import { ProcedimientoQContext } from '@domains/procedimiento-q/contexts';
import { label } from '@domains/procedimiento-q/constants';

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

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-q/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (row: any) => {
      confirmDialog.open({
        entity: `${label.procedimientoQ}`,
        identifier: `${row.codigo}`,
        async onClickYes() {
          await ProcedimientoQRepository.deleteProcedimientoQById(row.id);
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
              { label: 'Código' },
              { label: 'Denominación' },
              // { label: 'Descripción' },
              { label: 'Tipo Procedimiento Cantidad' },
              { label: 'Procedimiento Builtin' },
              { label: 'Procedimiento Custom' },
              { label: '' },
            ]}
            repositoryFunc={ProcedimientoQRepository.getAllProcedimientoQPaginated}
            rowTemplate={row => (
              <>
                <td>{row.codigo}</td>
                <td>{row.denominacion}</td>
                {/* <td>{row.descripcion}</td> */}
                <td>{row.tipoProcedimientoQ}</td>
                <td>{row.procedimientoBuiltin}</td>
                <td>{row.procedimientoCustom}</td>
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

export default withBreadcrumb(ProcedimientoQDataGrid, ProcedimientoQDataGridBreadcrumb);

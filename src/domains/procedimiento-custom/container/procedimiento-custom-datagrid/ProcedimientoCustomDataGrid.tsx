import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

import { Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/pro-components';

import { ProcedimientoCustomRepository } from '@domains/procedimiento-custom/repository';
import { ProcedimientoCustomDataGridBreadcrumb, label } from '@domains/procedimiento-custom/constants';
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
    (row: any) => {
      confirmDialog.open({
        entity: `${label.procedimientoCustom}`,
        identifier: `${row.denominacion}`,
        async onClickYes() {
          await ProcedimientoCustomRepository.deleteProcedimientoCustomById(row.id);
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
              { headerName: 'Código' },
              { headerName: 'DENOMINACIÓN' },
              { headerName: 'TIPO FUNCIÓN' },
              { headerName: 'ACCIÓN' },
              { headerName: 'EVENTO' },
              { headerName: 'CAMPO' },
              { headerName: 'Expresión Filtro' },
              { headerName: '' },
            ]}
            repositoryFunc={ProcedimientoCustomRepository.getAllProcedimientoCustomPaginated}
            rowTemplate={row => (
              <>
                <td>{row.codigo}</td>
                <td>{row.denominacion}</td>
                <td>{row.funcion}</td>
                <td>{row.accion}</td>
                <td>{row.evento}</td>
                <td>{row.eventoCampo}</td>
                <td>{row.expresionFiltro}</td>
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

export default withBreadcrumb(ProcedimientoCustomDataGrid, ProcedimientoCustomDataGridBreadcrumb);

import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

import { Col, Row } from '@app/components';

import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/pro-components';

import { ProcedimientoQVariableContext } from '@domains/procedimiento-q-variable/contexts';
import { ProcedimientoQVariableRepository } from '@domains/procedimiento-q-variable/repository';

const ProcedimientoQVariableDataGrid = () => {
  const _navigate = useNavigate();
  const { procedimientoQId } = useParams();

  const { mainDataGrid } = useContext(ProcedimientoQVariableContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate(`/procedimiento-q/${procedimientoQId}/procedimiento-q-variable/create`);
  }, [_navigate, procedimientoQId]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-q/${procedimientoQId}/procedimiento-q-variable/${id}/edit`);
    },
    [_navigate, procedimientoQId],
  );

  const handleClickDelete = useCallback(
    (row: any) => {
      confirmDialog.open({
        entity: `Procedimiento Cantidad Cantidad Variable`,
        identifier: `${row.codigo}`,
        async onClickYes() {
          await ProcedimientoQVariableRepository.deleteProcedimientoQVariableById(row.id);
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
        idProcedimientoPS: procedimientoQId,
      },
    });
  }, [mainDataGrid, procedimientoQId]);

  return (
    <>
      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            columnHeads={[
              { label: 'CÓDIGO' },
              { label: 'NOMBRE' },
              { label: 'TIPO' },
              { label: 'DICCIONARIO' },
              { label: '' },
            ]}
            repositoryFunc={ProcedimientoQVariableRepository.getAllProcedimientoQVariablePaginated}
            rowTemplate={row => (
              <>
                <td>{row.codigo}</td>
                <td>{row.nombre}</td>
                <td>{row.tipo}</td>
                <td>{row.diccionario}</td>
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

export default ProcedimientoQVariableDataGrid;

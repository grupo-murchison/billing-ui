import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, useParams, Outlet } from 'react-router-dom';

import { DataGrid, Col, Row } from '@app/components';

import { useConfirmDialog } from '@app/hooks';

import { DataGridEditButton, DataGridDeleteButton } from '@app/pro-components';

import { ProcedimientoQVariableContext } from '@domains/procedimiento-q-variable/contexts';
import { ProcedimientoQVariableRepository } from '@domains/procedimiento-q-variable/repository';

const ProcedimientoQVariableDataGrid = () => {
  const _navigate = useNavigate();
  const { procedimientoQId } = useParams();

  const { mainDataGrid } = useContext(ProcedimientoQVariableContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate(`/procedimiento-q/${procedimientoQId}/edit/procedimiento-q-variable/create`);
  }, [_navigate, procedimientoQId]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-q/${procedimientoQId}/edit/procedimiento-q-variable/${id}/edit`);
    },
    [_navigate, procedimientoQId],
  );

  const handleClickDelete = useCallback(
    (id: number) => {
      confirmDialog.open({
        message: 'Desea eliminar el registro?',
        async onClickYes() {
          await ProcedimientoQVariableRepository.deleteProcedimientoQVariableById(id);
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
    </>
  );
};

export default ProcedimientoQVariableDataGrid;

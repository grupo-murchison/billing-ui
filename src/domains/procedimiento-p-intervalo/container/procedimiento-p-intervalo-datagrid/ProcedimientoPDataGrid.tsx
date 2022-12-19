import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, useParams, Outlet } from 'react-router-dom';

import { DataGrid, Col, Row } from '@app/components';

import { useConfirmDialog } from '@app/hooks';

import { DataGridEditButton, DataGridDeleteButton } from '@app/pro-components';

import { ProcedimientoPIntervaloContext } from '@domains/procedimiento-p-intervalo/contexts';
import { ProcedimientoPIntervaloRepository } from '@domains/procedimiento-p-intervalo/repository';

const ProcedimientoPIntervaloDataGrid = () => {
  const _navigate = useNavigate();
  const { procedimientoPId } = useParams();

  const { mainDataGrid } = useContext(ProcedimientoPIntervaloContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate(`/procedimiento-p/${procedimientoPId}/edit/procedimiento-p-intervalo/create`);
  }, [_navigate, procedimientoPId]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-p/${procedimientoPId}/edit/procedimiento-p-intervalo/${id}/edit`);
    },
    [_navigate, procedimientoPId],
  );

  const handleClickDelete = useCallback(
    (id: number) => {
      confirmDialog.open({
        message: 'Desea eliminar el registro?',
        async onClickYes() {
          await ProcedimientoPIntervaloRepository.deleteProcedimientoPIntervaloById(id);
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
        idProcedimientoP: procedimientoPId,
      },
    });
  }, [mainDataGrid, procedimientoPId]);

  return (
    <>
      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            columnHeads={[
              { label: 'INTERVALO' },
              { label: 'VALOR INICIAL' },
              { label: 'VALOR FINAL' },
              { label: 'PRECIO' },
              { label: '' },
              { label: '' },
            ]}
            repositoryFunc={ProcedimientoPIntervaloRepository.getAllProcedimientoPIntervaloPaginated}
            rowTemplate={row => (
              <>
                <td>{row.intervalo}</td>
                <td>{row.valorInicial}</td>
                <td>{row.valorFinal}</td>
                <td>{row.precio}</td>
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

export default ProcedimientoPIntervaloDataGrid;

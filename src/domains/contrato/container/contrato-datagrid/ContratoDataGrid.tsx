import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import { Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/pro-components';

import { ContratoRepository } from '@domains/contrato/repository';
import { ContratoDataGridBreadcrumb } from '@domains/contrato/constants';
import { ContratoContext } from '@domains/contrato/contexts';

import { DateLib } from '@libs';

const ContratoDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ContratoContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/contrato/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/contrato/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (id: number) => {
      confirmDialog.open({
        message: 'Desea eliminar el registro?',
        async onClickYes() {
          await ContratoRepository.deleteContratoById(id);
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
            columnHeads={[
              { label: 'Nº Contrato' },
              { label: 'Descripción' },
              { label: 'Tipo Contrato' },
              { label: 'Modelo Acuerdo' },
              { label: 'Cliente' },
              { label: 'Fecha Inicio' },
              { label: 'Fecha Fin' },
              { label: '' },
              { label: '' },
            ]}
            onClickNew={handleClickCreate}
            repositoryFunc={ContratoRepository.getAllContratoPaginated}
            rowTemplate={row => (
              <>
                <td>{row.nroContrato}</td>
                <td>{row.descripcion}</td>
                <td>{row.tipoContrato}</td>
                <td>{row.modeloAcuerdo}</td>
                <td>{row.cliente}</td>
                <td>{DateLib.beautifyDBString(row.fechaInicioContrato)}</td>
                <td>{DateLib.beautifyDBString(row.fechaFinContrato)}</td>
                <td align='center'>
                  <DataGrid.EditButton onClick={() => handleClickEdit(row.id)} />
                </td>
                <td align='center'>
                  <DataGrid.DeleteButton onClick={() => handleClickDelete(row.id)} />
                </td>
              </>
            )}
          />
        </Col>
      </Row>
      <Outlet />
    </>
  );
};

export default withBreadcrumb(ContratoDataGrid, ContratoDataGridBreadcrumb);

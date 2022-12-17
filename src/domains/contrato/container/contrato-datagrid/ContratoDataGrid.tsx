import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import { DataGrid, Portlet, Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';

import { ContratoRepository } from '@domains/contrato/repository';
import { ContratoDataGridBreadcrumb } from '@domains/contrato/constants';
import { ContratoContext } from '@domains/contrato/contexts';

import { DateLib } from '@libs';

const ContratoDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ContratoContext);

  const handleClickCreate = useCallback(() => {
    _navigate('/contrato/create');
  }, [_navigate]);

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
              { label: 'DESCRIPCIÓN' },
              { label: 'TIPO CONTRATO' },
              { label: 'MODELO ACUERDO' },
              { label: 'CLIENTE' },
              { label: 'FECHA INICIO' },
              { label: 'FECHA FIN' },
            ]}
            onClickNew={handleClickCreate}
            repositoryFunc={ContratoRepository.getAllContratoPaginated}
            rowTemplate={row => (
              <>
                <td>{row.descripcion}</td>
                <td>{row.tipContrato}</td>
                <td>{row.modeloAcuerdo}</td>
                <td>{row.cliente}</td>
                <td>{DateLib.beautifyDBString(row.fechaInicioContrato)}</td>
                <td>{DateLib.beautifyDBString(row.fechaFinContrato)}</td>
              </>
            )}
          />
        </Col>
      </Row>
      <Outlet />
    </Portlet>
  );
};

export default withBreadcrumb(ContratoDataGrid, ContratoDataGridBreadcrumb);

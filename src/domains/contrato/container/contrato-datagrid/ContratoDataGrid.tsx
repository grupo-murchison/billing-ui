import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import { DataGrid, Portlet, Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';

import { ContratoRepository } from '@domains/contrato/repository';
import { ContratoDataGridBreadcrumb } from '@domains/contrato/constants';
import { ContratoContext } from '@domains/contrato/contexts';

import { DateLib } from '@libs';

import { Button } from '@mui/material';

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
        <Col md={12} textAlign='right'>
          <Button variant='outlined' onClick={handleClickCreate}>
            Nuevo Contrato
          </Button>
        </Col>
      </Row>
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
              { label: '' },
            ]}
            repositoryFunc={ContratoRepository.getAllContratoPaginated}
            rowTemplate={row => (
              <>
                <DataGrid.TableCell>{row.descripcion}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.tipContrato}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.modeloAcuerdo}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.cliente}</DataGrid.TableCell>
                <DataGrid.TableCell>{DateLib.beautifyDBString(row.fechaInicioContrato)}</DataGrid.TableCell>
                <DataGrid.TableCell>{DateLib.beautifyDBString(row.fechaFinContrato)}</DataGrid.TableCell>
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

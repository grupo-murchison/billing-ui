import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

import { Col, Row } from '@app/components';
import { rowSanitizer } from '@app/components/DataGrid/helpers';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/pro-components';

import { FacturacionRepository } from '@domains/facturacion/repository';
import { FacturacionContext } from '@domains/facturacion/contexts';
import { FacturacionDataGridBreadcrumb } from '@domains/facturacion/constants';
import { ContratoRowDataGridSchema } from '@domains/contrato/repository/contrato.schemas';
import { ContartoLabelAndPath } from '@domains/contrato/constants';

const FacturacionDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(FacturacionContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    // _navigate('/contrato/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (row: ContratoRowDataGridSchema) => {
      _navigate(`/facturacion/${row.id}/edit`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (row: ContratoRowDataGridSchema) => {
      confirmDialog.open({
        entity: `${ContartoLabelAndPath.label}`,
        identifier: `${row.nroContrato}`,
        async onClickYes() {
          await FacturacionRepository.deleteFacturasById(row.id);
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
              { headerName: 'Nº Secuencia Contrato' },
              { headerName: 'Estado' },
              { headerName: 'Contrato Descripcion' },
              { headerName: 'Cliente Descripcion' },
              { headerName: 'Facturacion Cabecera Estado' },
            ]}
            onClickNew={handleClickCreate}
            repositoryFunc={FacturacionRepository.getAllFacturasPaginated}
            rowTemplate={row => (
              <>
                {/* // TODO acá iria una funcion con row.map() que aplique rowSanitizer() a cada column y deberia recibir además un archivo de configuracion para ordenar las columnas*/}
                <td>{rowSanitizer(row.numeroSecuenciaContrato)}</td>
                <td>{rowSanitizer(row.estado)}</td>
                <td>{rowSanitizer(row.contratoDescripcion)}</td>
                <td>{rowSanitizer(row.clienteDescripcion)}</td>
                <td>{rowSanitizer(row.facturacionCabeceraEstado)}</td>

                <td align='center'>
                  <Stack direction='row' justifyContent='center' spacing={1}>
                    <DataGrid.EditButton onClick={() => handleClickEdit(row)} />
                    <DataGrid.DeleteButton onClick={() => handleClickDelete(row)} />
                  </Stack>
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

export default withBreadcrumb(FacturacionDataGrid, FacturacionDataGridBreadcrumb);

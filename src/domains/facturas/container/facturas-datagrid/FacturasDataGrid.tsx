import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

import { Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/pro-components';

import { FacturasRepository } from '@domains/facturas/repository';
import { FacturasContext } from '@domains/facturas/contexts';
import { FacturasDataGridBreadcrumb } from '@domains/facturas/constants';
import { ContratoRowDataGridSchema } from '@domains/contrato/repository/contrato.schemas';
import { ContartoLabelAndPath } from '@domains/contrato/constants';

const FacturasDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(FacturasContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/contrato/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (row: ContratoRowDataGridSchema) => {
      _navigate(`/contrato/${row.id}/edit`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (row: ContratoRowDataGridSchema) => {
      confirmDialog.open({
        entity: `${ContartoLabelAndPath.label}`,
        identifier: `${row.nroContrato}`,
        async onClickYes() {
          await FacturasRepository.deleteFacturasById(row.id);
          confirmDialog.close();
          mainDataGrid.reload();
        },
      });
    },
    [confirmDialog],
  );

  useEffect(() => {
    console.log('useEffect');

    mainDataGrid.load();
  }, [mainDataGrid]);

  return (
    <>
      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            columnHeads={[
              { label: 'Nº Secuencia Contrato' },
              { label: 'Estado' },
              { label: 'Contrato Descripcion' },
              { label: 'Cliente Descripcion' },
              { label: 'Facturacion Cabecera Estado' },
              { label: '' },
            ]}
            onClickNew={handleClickCreate}
            repositoryFunc={FacturasRepository.getAllFacturasPaginated}
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

export default withBreadcrumb(FacturasDataGrid, FacturasDataGridBreadcrumb);

type TFn = (value: any) => any;
type TTowSanitizer = string | number | boolean | null | undefined | TFn;

//* idea prototipo, se puede mejorar
const rowSanitizer = (value: TTowSanitizer): string | any => {
  return value === null || value === undefined ? ' ' : value;
};

import { useContext, useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
// import { useConfirmDialog } from '@app/hooks';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { FacturacionRepository } from '@domains/facturacion/repository';
import { FacturacionReporteContext } from '@domains/facturacion/contexts';
import { FacturacionReporteBreadcrumb } from '@domains/facturacion/constants';

import { toolbarMUI } from '@app/components/DataGrid/components/ToolbarMUI';

const FacturacionReporte = () => {
  // const _navigate = useNavigate();

  const { mainDataGrid } = useContext(FacturacionReporteContext);

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
              { field: 'numeroSecuenciaContrato', headerName: 'Nº Secuencia Contrato', flex: 0.5 },
              { field: 'estado', headerName: 'Estado', flex: 0.5 },
              {
                field: 'contratoDescripcion',
                headerName: 'Contrato Descripcion',
                flex: 2,
                // renderCell: params => renderCellResolver('renderCellExpand', params),
              },
              { field: 'clienteDescripcion', headerName: 'Cliente Descripcion', flex: 1 },
              { field: 'facturacionCabeceraEstado', headerName: 'Facturacion Cabecera Estado' },
            ]}
            repositoryFunc={FacturacionRepository.getAllFacturasPaginated}
            toolbar={toolbarMUI}
          />
        </Col>
      </Row>
      <Outlet />
    </>
  );
};

export default withBreadcrumb(FacturacionReporte, FacturacionReporteBreadcrumb);

type TFn = (value: any) => any;
type TTowSanitizer = string | number | boolean | null | undefined | TFn;

//* idea prototipo, se puede mejorar
const rowSanitizer = (value: TTowSanitizer): string | any => {
  return value === null || value === undefined ? ' ' : value;
};

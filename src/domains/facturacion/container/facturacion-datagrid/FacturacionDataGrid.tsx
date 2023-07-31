import { useCallback, useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';

import { Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/components/DataGrid';

import { FacturacionRepository } from '@domains/facturacion/repository';
import { FacturacionContext } from '@domains/facturacion/contexts';
import { FacturacionDataGridBreadcrumb } from '@domains/facturacion/constants';
import { ContratoRowDataGridSchema } from '@domains/contrato/repository/contrato.schemas';
import { ContartoLabelAndPath } from '@domains/contrato/constants';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ViewIcon } from '@assets/icons';
import { DateLib } from '@libs';

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
      <Paper>
        <DataGrid
          hookRef={mainDataGrid.ref}
          columnHeads={[
            { field: 'numeroSecuenciaFacturacion', headerName: 'Nro. Facturación' },
            {
              field: 'fechaEjecucion',
              headerName: 'Fecha Facturación',
              valueGetter: params => DateLib.parseFromDBString(params.value),
              type: 'date',
            },
            {
              field: 'clienteId',
              headerName: 'Nro. Cliente',
              flex: 0.8,
              valueGetter: params => params.row.contratos[0]?.contratoClienteNumero || '',
            },
            {
              field: 'denominación',
              headerName: 'Denominación',
              valueGetter: params => params.row.contratos[0]?.sociedadDenominacion || '',
            },
            {
              field: 'numeroSecuenciaContrato',
              headerName: 'Nro. Contrato',
              flex: 0.9,
              valueGetter: params => params.row.contratos[0]?.numeroSecuenciaContrato || '',
            },
            {
              field: 'contratoDescripcion',
              headerName: 'Descripción Contrato',
              flex: 2,
              valueGetter: params => params.row.contratos[0]?.contratoClienteDescripcion || '',
            },
            {
              field: 'periodo',
              headerName: 'Período',
              valueGetter: params => params.row.contratos[0]?.periodoNumero || '',
              flex: 0.5,
            },
            {
              field: 'actions',
              type: 'actions',
              headerName: 'Acciones',
              headerAlign: 'center',
              align: 'center',
              flex: 0.5,
              getActions: params => [
                <GridActionsCellItem
                  key={2}
                  icon={<ViewIcon />}
                  label='Ver Soporte'
                  // onClick={toggleAdmin(params.id)}
                  showInMenu
                />,
                <GridActionsCellItem
                  key={3}
                  icon={<ViewIcon />}
                  label='Ver Proforma'
                  // onClick={duplicateUser(params.id)}
                  showInMenu
                />,
                // <IconMenu
                //   key={4}
                //   options={[
                //     { label: 'Ver Soporte', icon: '', caption: '' },
                //     { label: 'Ver Proforma', icon: '', caption: '' },
                //   ]}
                // />,
              ],
            },
          ]}
          repositoryFunc={FacturacionRepository.getAllFacturasPaginated}
          // toolbar={Toolbar}
        />
      </Paper>
    </>
  );
};

export default withBreadcrumb(FacturacionDataGrid, FacturacionDataGridBreadcrumb);

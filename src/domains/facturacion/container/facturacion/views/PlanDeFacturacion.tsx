import { useContext, useEffect, useState } from 'react';

import { TextField } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { Col, Row } from '@app/components';
import DataGridBase from '@app/components/DataGrid/DataGridBase';
import Backdrop from '@app/components/Backdrop/Backdrop';
import Toast from '@app/components/Toast/Toast';

import { ContratoRepository } from '@domains/contrato/repository';
import { FacturacionRepository } from '@domains/facturacion/repository';

import { DateLib } from '@libs';

import { ScheduleSendIcon, ViewIcon } from '@assets/icons';
import { FacturacionContext } from '@domains/facturacion/contexts';
import DetalleFacturacion from './DetalleFacturacion';

function PlanDeFacturacion({ contratoId }: { contratoId: number | undefined }) {
  const [planFacturacion, setPlanFacturacion] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSackbar, setOpenSackbar] = useState(false);
  const [errorFromBackEnd, setErrorFromBackEnd] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Periodo Facturado Correctamente!');
  const [periodo, setPeriodo] = useState<any>(null);

  const { isPeriodoFacturado, handleDisableFacturar } = useContext(FacturacionContext);

  useEffect(() => {
    if (contratoId) {
      setLoading(true);
      ContratoRepository.getPlanFacturacionPeriodos({ contratoId })
        .then(({ data }) => {
          setPlanFacturacion(data.data[0]);
        })
        .catch()
        .finally(() => setLoading(false));
    }
  }, [contratoId, openSackbar]);

  const onClickFacturar = () => {
    setOpenBackdrop(true);
    if (contratoId) {
      FacturacionRepository.facturacionManual(contratoId)
        .then(({ data }) => {
          setOpenSackbar(true);
          setSnackbarMessage(data);
        })
        .catch(error => {
          console.log('Facturando Error', error);
          setErrorFromBackEnd(true);
          setSnackbarMessage('Ocurrió un error!');
        })
        .finally(() => setOpenBackdrop(false));
    }
  };

  const onClickVerDetalle = (row: any) => {
    setPeriodo(row);
  };

  return (
    <>
      <Row>
        <Col sm={12} md={4}>
          <TextField
            label={'Fecha Facturación'}
            name='fechaFacturacion'
            //* Se debe completar con la fecha del dia. (por ahora no es un campo editable)
            value={DateLib.beautifyDBString(DateLib.parseToDBString(new Date()))}
            inputProps={{ readOnly: true }}
            fullWidth
          />
        </Col>
      </Row>

      <DataGridBase
        rows={planFacturacion?.periodos || []}
        loading={loading}
        columns={[
          {
            field: 'periodo',
            headerName: 'Periodo',
          },
          {
            field: 'liquidacionDesde',
            headerName: 'Desde',
            type: 'date',
            valueGetter: params => DateLib.parseFromDBString(params.value),
          },
          {
            field: 'liquidacionHasta',
            headerName: 'Hasta',
            type: 'date',
            valueGetter: params => DateLib.parseFromDBString(params.value),
          },
          {
            field: 'fechaFacturacion',
            headerName: 'Fecha Facturacion',
            valueGetter: params => DateLib.parseFromDBString(params.value),
            type: 'date',
          },
          {
            field: 'estado',
            headerName: 'Estado',
          },
          {
            field: 'actions',
            type: 'actions',
            headerName: 'Acciones',
            headerAlign: 'center',
            align: 'center',
            flex: 0.5,
            getActions: params => [
              // isPeriodoFacturado(params?.row?.estado) ? (
              //   <GridActionsCellItem
              //     key={1}
              //     icon={<ViewIcon />}
              //     label='Detalle'
              //     onClick={() => onClickVerDetalle(params.row)}
              //     showInMenu
              //   />
              // ) : (
              //   <></>
              // ),
              // !isPeriodoFacturado(params?.row?.estado) ? (
              <GridActionsCellItem
                key={2}
                icon={<ScheduleSendIcon />}
                label='Facturar'
                onClick={onClickFacturar}
                showInMenu
                disabled={handleDisableFacturar(params.row, planFacturacion?.periodos)}
              />,
              // ) : (
              // <></>
              // ),
            ],
          },
        ]}
      />

      {periodo && <DetalleFacturacion periodo={periodo} />}

      <Backdrop open={openBackdrop} />

      <Toast
        open={openSackbar}
        error={errorFromBackEnd}
        onClose={() => setOpenSackbar(false)}
        message={snackbarMessage}
      />
    </>
  );
}

export default PlanDeFacturacion;

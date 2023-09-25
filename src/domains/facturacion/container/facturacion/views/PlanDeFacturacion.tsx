import { useContext, useEffect, useState } from 'react';

import { TextField, Tooltip } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { Col, Row } from '@app/components';
import DataGridBase from '@app/components/DataGrid/DataGridBase';
import Backdrop from '@app/components/Backdrop/Backdrop';
import Toast from '@app/components/Toast/Toast';

import { ContratoRepository } from '@domains/contrato/repository';
import { FacturacionRepository } from '@domains/facturacion/repository';

import { DateLib } from '@libs';

import { ScheduleSendIcon } from '@assets/icons';
import { FacturacionContext } from '@domains/facturacion/contexts';
import DetalleFacturacion from './DetalleFacturacion';
import CustomChip from '@app/components/Chip/Chip';

function PlanDeFacturacion({ contratoId }: { contratoId: number | undefined }) {
  const [planFacturacion, setPlanFacturacion] = useState<AnyValue>(null);
  const [loading, setLoading] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSackbar, setOpenSackbar] = useState(false);
  const [errorFromBackEnd, setErrorFromBackEnd] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Periodo Facturado Correctamente!');
  const [periodo, setPeriodo] = useState<AnyValue>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          setSnackbarMessage(
            `Proceso ejecutado correctamente. Se generó el Número de Secuencia de Facturación: ${data?.numeroSecuenciaFacturacion}`,
          );
        })
        .catch(error => {
          setSnackbarMessage(error?.message);
          setErrorFromBackEnd(true);
        })
        .finally(() => {
          setOpenBackdrop(false);
          setOpenSackbar(true);
        });
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClickVerDetalle = (row: AnyValue) => {
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
            valueGetter: params => DateLib.beautifyDBString(params.value),
          },
          {
            field: 'liquidacionHasta',
            headerName: 'Hasta',
            valueGetter: params => DateLib.beautifyDBString(params.value),
          },
          {
            field: 'fechaFacturacion',
            headerName: 'Fecha Facturacion',
            valueGetter: params => DateLib.beautifyDBString(params.value),
          },
          {
            field: 'estado',
            headerName: 'Estado',
            renderCell: params => {
              return (
                <CustomChip estado={params.value} />
              );
            },
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
                icon={
                  <Tooltip title='Facturar' placement='left'>
                    <ScheduleSendIcon
                      color={handleDisableFacturar(params.row, planFacturacion?.periodos) ? 'disabled' : 'inherit'}
                    />
                  </Tooltip>
                }
                label='Facturar'
                onClick={onClickFacturar}
                // showInMenu
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

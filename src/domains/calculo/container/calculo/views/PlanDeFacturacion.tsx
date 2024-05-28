import { useCallback, useContext, useEffect, useState } from 'react';

import { TextField, Tooltip } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { Col, Row } from '@app/components';
import DataGridBase from '@app/components/DataGrid/DataGridBase';
import Backdrop from '@app/components/Backdrop/Backdrop';
import Toast from '@app/components/Toast/Toast';

import { ContratoRepository } from '@domains/contrato/repository';
import { CalculoRepository } from '@domains/calculo/repository';

import { DateLib } from '@libs';

import { ScheduleSendIcon } from '@assets/icons';
import { CalculoContext } from '@domains/calculo/contexts';
import DetalleFacturacion from './DetalleCalculo';
import CustomChip from '@app/components/Chip/Chip';
import { Periodo } from '@domains/calculo/repository/schemas/types';

function PlanDeFacturacion({ contratoId }: { contratoId: number | undefined }) {
  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [loading, setLoading] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSackbar, setOpenSackbar] = useState(false);
  const [errorFromBackEnd, setErrorFromBackEnd] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Periodo Calculado Correctamente!');
  const [periodo, setPeriodo] = useState<Periodo>();
  const [updatingPeriod, setUpdatingPeriod] = useState<number | null>(null);

  const { handleDisableCalcular } = useContext(CalculoContext);

  const fetchPlanFacturacion = useCallback(async () => {
    if (contratoId) {
      setLoading(true);
      await ContratoRepository.getPlanFacturacionPeriodos({ contratoId })
        .then(({ data }) => {
          const updatedPeriodos = data.data[0].periodos.map((periodo: Periodo) => ({
            ...periodo,
            disabled: handleDisableCalcular(periodo, data.data[0].periodos),
          }));
          setPeriodos(updatedPeriodos);
        })
        .catch()
        .finally(() => setLoading(false));
    }
  }, [contratoId]);

  useEffect(() => {
    fetchPlanFacturacion();
  }, [fetchPlanFacturacion]);

  const onClickCalcular = async (row: any) => {
    setOpenBackdrop(true);
    setUpdatingPeriod(row.id);

    if (contratoId) {
      await CalculoRepository.calculoFacturacionManual(contratoId, row.contratoPlanFacturacionId, row.periodo)
        .then(async ({ data }) => {
          setSnackbarMessage(
            `Proceso ejecutado correctamente. Se generó el Número de Secuencia de Calculo: ${data?.numeroSecuenciaCalculo}`,
          );
          const updatedPeriodos = periodos.map(periodo =>
            periodo.id === row.id ? { ...periodo, estado: 'CALCULADO', disabled: true } : periodo,
          );
          setPeriodos(updatedPeriodos);
        })
        .catch(error => {
          setSnackbarMessage(error?.message);
          setErrorFromBackEnd(true);
        })
        .finally(() => {
          setTimeout(async () => {
            setOpenBackdrop(false);
            setOpenSackbar(true);
            setUpdatingPeriod(null);
            // Como son dos servicios diferentes, hay un delay entre calcular y el impacto en la base para el fetch de la Grilla
            await fetchPlanFacturacion();
          }, 4000);
        });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClickVerDetalle = (row: Periodo) => {
    setPeriodo(row);
  };

  return (
    <>
      <>
        <Row>
          <Col sm={12} md={4}>
            <TextField
              label={'Fecha Cálculo'}
              name='fechaCalculo'
              //* Se debe completar con la fecha del dia. (por ahora no es un campo editable)
              value={DateLib.beautifyDBString(DateLib.parseToDBString(new Date()))}
              inputProps={{ readOnly: true }}
              fullWidth
            />
          </Col>
        </Row>

        <DataGridBase
          rows={periodos}
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
              field: 'fechaFacturacion', // TODO debe cambiar en la API por fechaCalculo o similar
              headerName: 'Fecha Cálculo',
              valueGetter: params => DateLib.beautifyDBString(params.value),
            },
            {
              field: 'estado',
              headerName: 'Estado',
              renderCell: params => {
                return <CustomChip estado={params.value} />;
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
                // isPeriodoCalculado(params?.row?.estado) ? (
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
                <GridActionsCellItem
                  key={2}
                  icon={
                    <Tooltip title='Calcular' placement='left'>
                      <ScheduleSendIcon
                        color={updatingPeriod === params.row.id || params.row.disabled ? 'disabled' : 'inherit'}
                      />
                    </Tooltip>
                  }
                  label='Calcular'
                  onClick={() => onClickCalcular(params.row)}
                  // showInMenu
                  disabled={updatingPeriod === params.row.id || params.row.disabled}
                />,
              ],
            },
          ]}
        />
      </>

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

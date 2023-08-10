import { useContext, useEffect, useState } from 'react';

import {
  Alert,
  Backdrop,
  CircularProgress,
  Paper,
  Snackbar,
  TextField,
} from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { Col, Row } from '@app/components';
import DataGridBase from '@app/components/DataGrid/DataGridBase';

import { ContratoRepository } from '@domains/contrato/repository';
import { FacturacionRepository } from '@domains/facturacion/repository';

import { DateLib } from '@libs';

import { ScheduleSendIcon, ViewIcon } from '@assets/icons';
import { FacturacionContext } from '@domains/facturacion/contexts';

function PlanDeFacturacion({ contratoId }: { contratoId: number | undefined }) {
  const [planFacturacion, setPlanFacturacion] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSackbar, setOpenSackbar] = useState(false);
  const [errorFromBackEnd, setErrorFromBackEnd] = useState(false);

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSackbar(false);
  };

  const { isPeriodoFacturado } = useContext(FacturacionContext);

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
        .then(response => {
          console.log('Facturado ok', response);
          setOpenSackbar(true);
        })
        .catch(error => {
          console.log('Facturado Error', error);
          setErrorFromBackEnd(true);
        })
        .finally(() => setOpenBackdrop(false));
    }
  };

  const onClickLog = (params: any) => {
    console.log(params);
  };

  return (
    <>
      {/* <Card sx={{ p: 3 }}>
        <CardHeader
          title={
            <Typography variant='h3' component='h2'>
              Plan De Facturación
            </Typography>
          }
        />

        <CardContent> */}
          <Row>
            <Col sm={12} md={4}>
              <TextField
                label={'Fecha Facturación'}
                name='fechaFacturacion'
                //* Se debe completar con la fecha del dia. (por ahora no es un campo editable)
                value={DateLib.beautifyDBString(DateLib.parseToDBString(new Date()))}
                inputProps={{ readOnly: true }}
              />
            </Col>
          </Row>

          <Paper>
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
                    isPeriodoFacturado(params?.row?.estado) ? (
                      <GridActionsCellItem
                        key={1}
                        icon={<ViewIcon />}
                        label='Log'
                        onClick={() => onClickLog(params)}
                        showInMenu
                      />
                    ) : (
                      <></>
                    ),
                    !isPeriodoFacturado(params?.row?.estado) ? (
                      <GridActionsCellItem
                        key={2}
                        icon={<ScheduleSendIcon />}
                        label='Facturar'
                        onClick={onClickFacturar}
                        showInMenu
                      />
                    ) : (
                      <></>
                    ),
                  ],
                },
              ]}
            />
          </Paper>
        {/* </CardContent>
      </Card> */}

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={openBackdrop}>
        <CircularProgress color='inherit' />
      </Backdrop>

      <Snackbar
        open={openSackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={errorFromBackEnd ? 'error' : 'success'}
          variant='filled'
          sx={{ width: '100%' }}
          onClose={handleCloseSnackbar}
        >
          {errorFromBackEnd ? 'Ocurrió un error!' : 'Periodo Facturado Correctamente!'}
        </Alert>
      </Snackbar>
    </>
  );
}

export default PlanDeFacturacion;

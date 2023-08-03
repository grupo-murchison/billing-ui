import { useCallback, useContext, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Divider, Paper } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { Col, Row } from '@app/components';
import DataGrid from '@app/components/DataGrid/DataGrid';
// import { toolbarMUI } from '@app/components/DataGrid/components/ToolbarMUI';
import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';

import { withBreadcrumb } from '@app/hocs';

import { ClienteDropdownAutoComplete } from '@domains/cliente/container/cliente-dropdown';
import { ContratoRepository } from '@domains/contrato/repository';
import { FacturacionContext } from '@domains/facturacion/contexts';
import { FacturacionDataGridBreadcrumb } from '@domains/facturacion/constants';
import { SociedadDropdown } from '@domains/sociedad/container/sociedad-dropdown';
import { TipoContratoDropdown } from '@domains/tipo-contrato/container/tipo-contrato-dropdown';

import { DateLib } from '@libs';

import { ViewIcon } from '@assets/icons';
import FormSelect from '@app/components/Form/FormInputs/FormSelect';
import DataGridBase from '@app/components/DataGrid/DataGridBase';

const Facturacion = () => {
  // const _navigate = useNavigate();

  const { mainDataGrid, estadoOptions } = useContext(FacturacionContext);
  const [planFacturacion, setPlanFacturacion] = useState<any>(null);
  const [contratoId, setContratoId] = useState<number>();

  useEffect(() => {
    mainDataGrid.load();
  }, [mainDataGrid]);

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<any>({
    defaultValues: {
      clienteId: { value: '', code: '', label: '' },
      nroContrato: '',
      tipoContratoId: '',
      sociedadId: '',
      estadoEnum: 'ACTIVO',
    },
  });

  const onSubmit: SubmitHandler<any> = useCallback(
    async data => {
      const filters = {
        clienteId: data.clienteId?.value ? data.clienteId.value : undefined,
        estadoEnum: data?.estadoEnum ? data.estadoEnum : undefined,
        nroContrato: data?.nroContrato ? data.nroContrato : undefined,
        tipoContratoId: data?.tipoContratoId ? data.tipoContratoId : undefined,
        sociedadId: data?.sociedadId ? data.sociedadId : undefined,
      };

      mainDataGrid.load({ fixedFilters: { ...filters } });
    },
    [mainDataGrid],
  );

  const onClickAbrirPlanFacturacion = (params: any) => setContratoId(params.id);

  useEffect(() => {
    if (contratoId) {
      ContratoRepository.getPlanFacturacionPeriodos({ contratoId }).then(data => {
        // console.log('data', data.data.data[0]); // TODO por qué son dos datas anidados ?
        setPlanFacturacion(data.data.data[0]);
      });
    }
  }, [contratoId]);

  const toolbar = (
    <Paper sx={{ px: 3, pt: 4, pb: 2, my: 2 }}>
      <Form onSubmit={handleSubmit(onSubmit)} isSearch isSubmitting={isSubmitting}>
        <Row>
          <Col sm={12} md={6}>
            <ClienteDropdownAutoComplete
              control={control}
              disabled={isSubmitting}
              label='Cliente'
              name='clienteId'
              error={!!formErrors.clienteId}
            />
          </Col>
          <Col sm={12} md={6}>
            <SociedadDropdown
              control={control}
              disabled={isSubmitting}
              label='Sociedad'
              name='sociedadId'
              error={!!formErrors.sociedadId}
              emptyOption
            />
          </Col>
          <Col sm={12} md={6}>
            <TipoContratoDropdown
              control={control}
              disabled={isSubmitting}
              label='Tipo Contrato'
              name='tipoContratoId'
              error={!!formErrors.sociedadId}
              emptyOption
            />
          </Col>
          <Col sm={12} md={6}>
            <FormTextField control={control} label='Número de Contrato' name='nroContrato' type='number' />
          </Col>
          <Col sm={12} md={6}>
            <FormSelect control={control} label='Estado' name='estadoEnum' options={estadoOptions} emptyOption />
          </Col>
        </Row>
      </Form>
    </Paper>
  );

  return (
    <>
      {toolbar}
      <Paper>
        <DataGrid
          hookRef={mainDataGrid.ref}
          columns={[
            {
              field: 'nroContrato',
              headerName: 'Nro. Contrato',
              flex: 0.5,
            },
            { field: 'descripcion', headerName: 'Descripción Contrato', flex: 2 },
            {
              field: 'cliente',
              headerName: 'Cliente',
            },
            {
              field: 'sociedadDenominacion',
              headerName: 'Sociedad',
            },
            {
              field: 'fechaInicioContrato',
              headerName: 'Fecha Inicio',
              flex: 0.5,
              valueGetter: params => DateLib.parseFromDBString(params.value),
              type: 'date',
            },
            {
              field: 'fechaFinContrato',
              headerName: 'Fecha Fin',
              valueGetter: params => DateLib.parseFromDBString(params.value),
              type: 'date',
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
                  label='Ver Plan de Facturación'
                  onClick={() => onClickAbrirPlanFacturacion(params)}
                  showInMenu
                />,
              ],
            },
          ]}
          repositoryFunc={ContratoRepository.getAllContratoFacturacionPaginated}
        />
      </Paper>
      <Divider sx={{ my: 4 }} />
      <Paper>
        <DataGridBase
          rows={planFacturacion?.periodos || []}
          columns={[
            {
              field: 'periodo',
              headerName: 'Periodo',
              flex: 0.5,
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
                <GridActionsCellItem
                  key={1}
                  icon={<ViewIcon />}
                  label='Log'
                  onClick={() => onClickAbrirPlanFacturacion(params)}
                  showInMenu
                />,
                <GridActionsCellItem
                  key={2}
                  icon={<ViewIcon />}
                  label='Facturar'
                  onClick={() => onClickAbrirPlanFacturacion(params)}
                  showInMenu
                />,
              ],
            },
          ]}
        />
      </Paper>
    </>
  );
};

export default withBreadcrumb(Facturacion, FacturacionDataGridBreadcrumb);

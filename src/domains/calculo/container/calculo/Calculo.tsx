import { useCallback, useContext, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Paper } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { Col, Modal, Row } from '@app/components';
import DataGrid from '@app/components/DataGrid/DataGrid';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';

import { withBreadcrumb } from '@app/hocs';

import { ClienteDropdownAutoComplete } from '@domains/cliente/container/cliente-dropdown';
import { ContratoRepository } from '@domains/contrato/repository';
import { CalculoContext } from '@domains/calculo/contexts';
import { CalculoFacturacionDataGridBreadcrumb } from '@domains/calculo/constants';
import { SociedadDropdownAutoComplete } from '@domains/sociedad/container/sociedad-dropdown/SociedadDropdown';
import { TipoContratoDropdownAutoComplete } from '@domains/tipo-contrato/container/tipo-contrato-dropdown/TipoContratoDropdown';

import { DateLib } from '@libs';

import { ViewIcon } from '@assets/icons';
import FormSelect from '@app/components/Form/FormInputs/FormSelect';
import PlanDeFacturacion from './views/PlanDeFacturacion';
import CustomChip from '@app/components/Chip/Chip';

const CalculoFacturacion = () => {
  // const _navigate = useNavigate();

  const { mainDataGrid, estadosContrato, isContratoActivo } = useContext(CalculoContext);
  const [contratoId, setContratoId] = useState<number>();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    mainDataGrid.load();
  }, [mainDataGrid]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AnyValue>({
    defaultValues: {
      clienteId: { value: '', code: '', label: '' },
      nroContrato: '',
      tipoContratoId: '',
      sociedadId: '',
      estadoEnum: 'ACTIVO',
    },
  });

  const onSubmit: SubmitHandler<AnyValue> = useCallback(
    async data => {
      const filters = {
        clienteId: data.clienteId?.value ? data.clienteId.value : undefined,
        estadoEnum: data?.estadoEnum ? data.estadoEnum : undefined,
        nroContrato: data?.nroContrato ? data.nroContrato : undefined,
        tipoContratoId: data?.tipoContratoId.value ? data.tipoContratoId.value : undefined,
        sociedadId: data?.sociedadId.value ? data.sociedadId.value : undefined,
      };
      mainDataGrid.load({ fixedFilters: { ...filters } });
    },
    [mainDataGrid],
  );

  const onClickAbrirPlanFacturacion = (params: AnyValue) => {
    setContratoId(params.id);
    setOpenModal(true);
  };

  const toolbar = (
    <Paper sx={{ px: 3, pt: 4, pb: 2, my: 2 }}>
      <Form onSubmit={handleSubmit(onSubmit)} label='search' isSubmitting={isSubmitting}>
        <Row>
          <Col sm={12} md={6}>
            <ClienteDropdownAutoComplete control={control} disabled={isSubmitting} label='Cliente' name='clienteId' />
          </Col>
          <Col sm={12} md={6}>
            <SociedadDropdownAutoComplete
              control={control}
              disabled={isSubmitting}
              label='Sociedad'
              name='sociedadId'
            />
          </Col>
          <Col sm={12} md={6}>
            <TipoContratoDropdownAutoComplete
              control={control}
              disabled={isSubmitting}
              label='Tipo Contrato'
              name='tipoContratoId'
            />
          </Col>

          <Col sm={12} md={6}>
            <FormTextField control={control} label='Número de Contrato' name='nroContrato' type='number' />
          </Col>
          <Col sm={12} md={6}>
            <FormSelect control={control} label='Estado' name='estadoEnum' options={estadosContrato} emptyOption />
          </Col>
        </Row>
      </Form>
    </Paper>
  );

  return (
    <>
      {toolbar}

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
            field: 'estado',
            headerName: 'Estado',
            renderCell: params => {
              return <CustomChip estado={params.value} />;
            },
          },
          {
            field: 'fechaInicioContrato',
            headerName: 'Fecha Inicio',
            flex: 0.5,
            valueGetter: ({ value }) => DateLib.beautifyDBString(value),
          },
          {
            field: 'fechaFinContrato',
            headerName: 'Fecha Fin',
            flex: 0.5,
            valueGetter: params => DateLib.beautifyDBString(params.value),
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
                disabled={!isContratoActivo(params?.row?.estado)}
              />,
            ],
          },
        ]}
        repositoryFunc={ContratoRepository.getAllContratoCalculosFacturacionPaginated}
      />

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title='Plan De Facturación'>
        <PlanDeFacturacion contratoId={contratoId} />
      </Modal>
    </>
  );
};

export default withBreadcrumb(CalculoFacturacion, CalculoFacturacionDataGridBreadcrumb);

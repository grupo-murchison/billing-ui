  // import { withBreadcrumb } from '@app/hocs';

// function RootLayout() {
//   return <></>;
// }

// export default withBreadcrumb(RootLayout);


import { useState } from 'react';
import { withBreadcrumb } from '@app/hocs';
import { CardContent, Tab } from '@mui/material';
import Tabs from '@app/components/Tabs/Tabs';
import TabPanel from '@app/components/Tabs/TabPanel';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import FormDesktopDatePicker from '@app/components/Form/FormInputs/FormDatePicker';
import { Col, Row } from '@app/components';
import { FormDataContratoEditType } from '@domains/contrato/container/contrato-crud/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import TabLayout from '@app/components/Tabs/TabLayout';

function RootLayout() {
  // const [tabValue, setTabValue] = useState(0);
  // const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
  //   setTabValue(newValue);
  // };

  const {
    reset,
    handleSubmit,
    watch,
    control,
    resetField,
    formState: { isSubmitting, dirtyFields },
  } = useForm<FormDataContratoEditType>({
    defaultValues: {
      clienteId: '',
      descripcion: '',
      diaPeriodo: '',
      fechaInicioContrato: null,
      fechaFinContrato: null,
      modeloAcuerdoId: '',
      nroContrato: '',
      reglaFechaPeriodoId: '',
      pausado: false,
      sociedadId: '',
      tipoContratoId: '',
      tipoPlanFacturacionId: '',
    },
    // resolver: zodResolver(
    //   ValidationSchemaContratoEdit.superRefine((fields, ctx) => {
    //     if (isDiaFijoPosteriorAlPeriodo && fields.diaPeriodo === '') {
    //       ctx.addIssue({
    //         message: zodLocale.required_error,
    //         code: 'custom',
    //         path: ['diaPeriodo'],
    //       });
    //     }
    //   }),
    // ),
  });



  const datosContractuales = (
    <CardContent>
      <Row>
        <Col md={12}>
          <FormTextField control={control} disabled={isSubmitting} name='descripcion' label='Descripción' multiline />
        </Col>
        <Col md={6}>
          <FormDesktopDatePicker
            control={control}
            disabled={isSubmitting}
            label='Fecha Inicio Contrato'
            name='fechaInicioContrato'
            readOnly
          />
        </Col>
        <Col md={6}>
          <FormDesktopDatePicker
            control={control}
            disabled={isSubmitting}
            label='Fecha Fin Contrato'
            name='fechaFinContrato'
            readOnly
          />
        </Col>
      </Row>
    </CardContent>
  );

  const comp = ( <><h1>hola</h1></>)

  const labelAndComponentToRenderTabPanel = [{label:'Datos Generales', component: comp}, {label: 'Datos Contractuales', component: datosContractuales}]


  return (
    <TabLayout labelsAndComponents={labelAndComponentToRenderTabPanel}></TabLayout>
  );
}
export default withBreadcrumb(RootLayout);
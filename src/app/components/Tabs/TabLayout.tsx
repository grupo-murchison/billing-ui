import { useState } from 'react';
import { withBreadcrumb } from '@app/hocs';
import Tabs from '@app/components/Tabs/Tabs';
import TabPanel from '@app/components/Tabs/TabPanel';
import { Tab } from '@mui/material';

// interface labelAndComponentProps {
//     label: string; component: AnyValue
// }

// interface EnumLabelAndComponentProps extends Array<labelAndComponentProps>{}

// interface EnumServiceGetOrderBy {
//     [index: number]: { label: string; component: JSX.Element };
// }

type labelAndComponent = {
    label: string;
    component: JSX.Element
}

type TabPros = {
    labelsAndComponents: labelAndComponent[]
}


const TabLayout = ({labelsAndComponents}: TabPros) => {
  const [tabValue, setTabValue] = useState(0);
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Tabs value={tabValue} onChange={handleChangeTab}>
      {
        labelsAndComponents.map((el:AnyValue,index:AnyValue) => {
          return <Tab value={index} key={index} label={el.label} /> 
        })
      }
      </Tabs>
      {
        labelsAndComponents.map((el:AnyValue,index:AnyValue) => {
          return (
            <TabPanel value={tabValue} key={index} index={index}>
              {`Panel  ${el.label}`}
              {el.component}
            </TabPanel>
          )
        })
      }
    </>
  );
}
export default withBreadcrumb(TabLayout);




// const datosContractuales = (
//     <CardContent>
//       <Row>
//         <Col md={12}>
//           <FormTextField control={control} disabled={isSubmitting} name='descripcion' label='Descripción' multiline />
//         </Col>
//         <Col md={6}>
//           <FormDesktopDatePicker
//             control={control}
//             disabled={isSubmitting}
//             label='Fecha Inicio Contrato'
//             name='fechaInicioContrato'
//             readOnly
//           />
//         </Col>
//         <Col md={6}>
//           <FormDesktopDatePicker
//             control={control}
//             disabled={isSubmitting}
//             label='Fecha Fin Contrato'
//             name='fechaFinContrato'
//             readOnly
//           />
//         </Col>
//       </Row>
//     </CardContent>
//   );

//   const comp = ( <><h1>hola</h1></>)

//   const labelAndComponentToRenderTabPanel = [{label:'Datos Generales', component: comp}, {label: 'Datos Contractuales', component: datosContractuales}]


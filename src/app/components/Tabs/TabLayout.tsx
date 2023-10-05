import { useState } from 'react';
import Tab from '@app/components/Tabs/Tab';
import Tabs from '@app/components/Tabs/Tabs';
import TabPanel from '@app/components/Tabs/TabPanel';
import { TabProps as TabsPropsMui } from '@mui/material';

interface optionsTabLayout extends TabsPropsMui {
  renderelement: JSX.Element;
  isError?: boolean;
  formFields?: Array<string>;
  //TODO: tipar correctamente formErrors y no de modo generico
  formErrors?: AnyValue
}

type TabPros = {
  options: optionsTabLayout[];
};

const TabLayout = ({ options }: TabPros) => {
  const [tabValue, setTabValue] = useState(0);
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  /** Devuelve boolean para TabLayout. Revisa si hay un form error dentro de los formsFields
  * @param formFields
  * @param formErrors
  */
  const handleIsError = (formFields: AnyValue, formErrors: AnyValue) => {

    if (formErrors === null || formErrors === undefined) return false

    const keysOfErrors = Object.keys(formErrors);
    const auxilarArray = [];

    for (const fieldOfForm of formFields) {
      const hasError = keysOfErrors.includes(fieldOfForm);
      auxilarArray.push(hasError);
    }
    const result = auxilarArray.filter(el => el == true);
    return result.length > 0 ? true : false;
  };

  return (
    <>
      <Tabs value={tabValue} onChange={handleChangeTab} scrollButtons allowScrollButtonsMobile variant='scrollable'>
        {options.map((el: optionsTabLayout, index: number) => {
          const { formFields, formErrors, ...rest } = el;
          const isError = handleIsError(formFields, formErrors)

          return <Tab key={index} value={index} {...rest} isError={isError} />;
        })}
      </Tabs>
      {options.map((el: optionsTabLayout, index: number) => {
        return (
          <TabPanel value={tabValue} key={index} index={index}>
            {el.renderelement}
          </TabPanel>
        );
      })}
    </>
  );
};
export default TabLayout;

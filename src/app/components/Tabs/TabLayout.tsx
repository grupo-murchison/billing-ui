import { useState } from 'react';
import Tabs from '@app/components/Tabs/Tabs';
import TabPanel from '@app/components/Tabs/TabPanel';
import { Tab, TabProps as TabsPropsMui } from '@mui/material';

interface labelAndComponent extends TabsPropsMui {
  title: string;
  renderelement: JSX.Element
  rest?: TabsPropsMui
}

type TabPros = {
  options: labelAndComponent[]
  error?: AnyValue
}


const TabLayout = ({options, error}: TabPros) => {
  const [tabValue, setTabValue] = useState(0);
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  // console.log(error ?  error : 'nada')

  

  return (
    <>
      <Tabs value={tabValue} onChange={handleChangeTab}
        TabIndicatorProps={{
          style: {backgroundColor: "#D97D54"}
        }}
        scrollButtons
        allowScrollButtonsMobile
        variant="scrollable"
        >
      {
        options.map((el:labelAndComponent,index:number) => {
          const {  ...rest } = el;
          return <Tab value={index} key={index} label={el.title} {...rest} onChange={()=> console.log(error)}/> 
        })
      }
      </Tabs>
      {
        options.map((el:labelAndComponent,index:number) => {
          return (
            <TabPanel value={tabValue} key={index} index={index}>
              {`Panel ${el.title}`}
              {el.renderelement}
            </TabPanel>
          )
        })
      }
    </>
  );
}
export default TabLayout;
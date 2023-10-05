import { useState } from 'react';
import Tab from '@app/components/Tabs/Tab';
import Tabs from '@app/components/Tabs/Tabs';
import TabPanel from '@app/components/Tabs/TabPanel';
import { TabProps as TabsPropsMui } from '@mui/material';

interface optionsTabLayout extends TabsPropsMui {
  label: string;
  renderelement: JSX.Element;
  isError?: boolean;
  rest?: TabsPropsMui;
}

type TabPros = {
  options: optionsTabLayout[];
};

const TabLayout = ({ options }: TabPros) => {
  const [tabValue, setTabValue] = useState(0);
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Tabs value={tabValue} onChange={handleChangeTab} scrollButtons allowScrollButtonsMobile variant='scrollable'>
        {options.map((el: optionsTabLayout, index: number) => {
          const { ...rest } = el;
          return <Tab key={index} value={index} {...rest} isError={el?.isError} />;
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

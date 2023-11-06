import { Tabs as TabsMUI, TabsProps } from '@mui/material';

function Tabs(props: TabsProps) {

  const { children, ...rest } = props;

  return (
    <TabsMUI {...rest}
    //  textColor='inherit' indicatorColor='primary' 
     aria-label='secondary tabs example'>
      {children}
    </TabsMUI>
  );
}

export default Tabs;

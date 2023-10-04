import { DescriptionIcon, MenuIcon, QuestionMarkIcon } from '@assets/icons';
import { SvgIcon, Tab as TabMUI, TabProps as TabMuiProps } from '@mui/material';
import { IconRender } from 'layout/MenuItems/components';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface TabProps extends TabMuiProps {
  isError: boolean | undefined
}

function Tab({isError, ...rest}: TabProps) {
  return (
    <TabMUI
      iconPosition='end'
      {...rest}
      icon={isError ? <SvgIcon component={FiberManualRecordIcon} color='error'/> : <></>}
    /> 
  );
}

export default Tab;
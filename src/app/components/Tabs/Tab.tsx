import { SvgIcon, Tab as TabMUI, TabProps as TabMuiProps } from '@mui/material';
import { FiberManualRecordIcon } from '@assets/icons';

interface TabProps extends TabMuiProps {
  isError: boolean | undefined
}

function Tab({ isError, ...rest }: TabProps) {
  return (
    <TabMUI
      iconPosition='end'
      {...rest}
      icon={isError ? <SvgIcon component={FiberManualRecordIcon} color='error' /> : <></>}
    />
  );
}

export default Tab;
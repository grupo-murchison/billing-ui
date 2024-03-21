import CustomTooltip from './CustomTooltip';
import { HelpIcon } from '@assets/icons';
import { useTheme } from '@mui/material';

const HelperTooltip = ({ title }: HelperTooltip) => {
  const theme = useTheme();
  return (
    <CustomTooltip title={title}>
      <HelpIcon sx={{ color: theme.palette.text.primary }} />
    </CustomTooltip>
  );
};

type HelperTooltip = {
  title: string;
};

export default HelperTooltip;

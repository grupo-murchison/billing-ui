import { IconButton, styled } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const CustomWidthTooltip = styled(({ children, title, className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} title={title} arrow placement='right'>
    {children}
  </Tooltip>
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: '60%',
  },
});

const CustomTooltip = ({ title, children }: TooltipProps) => {
  return (
    <CustomWidthTooltip title={title}>
      <IconButton>{children}</IconButton>
    </CustomWidthTooltip>
  );
};

export default CustomTooltip;

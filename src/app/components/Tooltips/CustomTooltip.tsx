import { Button, styled } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { useState } from 'react';

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
  const [open, setOpen] = useState(false);

  const handleTooltip = () => {
    setOpen(!open);
  };

  return (
    <CustomWidthTooltip title={title} open={open} disableFocusListener disableHoverListener disableTouchListener>
      <Button onClick={handleTooltip}>{children}</Button>
    </CustomWidthTooltip>
  );
};

export default CustomTooltip;

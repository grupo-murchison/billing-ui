import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { SvgIcon, Typography, useTheme } from '@mui/material';
import { TIconRender } from '../../interfaces/menu-items.interface';

export function IconRender({ icon, level = 0, isSelected }: TIconRender) {
  const theme = useTheme();

  const getIconSize = () => (isSelected ? 10 : 6);

  const iconRender = icon ? (
    <SvgIcon component={icon} sx={{ color: theme.palette.common.white }} />
  ) : (
    <SvgIcon
      component={FiberManualRecordIcon}
      sx={{
        color: theme.palette.common.white,
        width: getIconSize(),
        height: getIconSize(),
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  return <>{iconRender}</>;
}

export function ListSubHeader({ title, caption }: { title: string; caption?: string }) {
  return (
    <Typography variant='caption' display='block' gutterBottom>
      {title}
      {caption && <MenuItemCaption caption={caption} />}
    </Typography>
  );
}

export function MenuItemCaption({ caption }: { caption: string }) {
  return (
    <Typography variant='caption' display='block' gutterBottom>
      {caption}
    </Typography>
  );
}

export function MenuItemError({ key, message }: { key: string | number; message?: string }) {
  return (
    <Typography key={key} variant='h6' color='error' align='center'>
      {message ? message : 'Menu Item Error'}
    </Typography>
  );
}

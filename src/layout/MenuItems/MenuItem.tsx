import { Ref, forwardRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { SxProps } from '@mui/material/styles';

import { IconRender } from './components';
import { IMenuItem } from '../interfaces/menu-items.interface';
import { useSidebarContext } from '../context/useSidebarContext';

function MenuItem({ menuItem, level }: MenuItemProps) {
  const { isActive, toogleActiveMenu } = useSidebarContext();

  // const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    if (document.location.pathname === menuItem.url) {
      toogleActiveMenu(menuItem?.id);
    }
  }, [document.location.pathname]);

  const itemTarget = menuItem.target ? '_blank' : '_self';
  const listItemProps = {
    component: menuItem?.external
      ? forwardRef((props, ref: Ref<HTMLAnchorElement>) => (
          <a ref={ref} {...props} href={menuItem.url} target={itemTarget} />
        ))
      : forwardRef((props, ref: Ref<HTMLAnchorElement>) => (
          <Link ref={ref} {...props} to={menuItem.url || ''} target={itemTarget} />
        )),
  };

  const handleClick = () => {
    toogleActiveMenu(menuItem?.id);
  };

  const isSelected = isActive.findIndex((id: string) => id === menuItem.id) > -1;

  return (
    <>
      <ListItemButton {...listItemProps} disabled={menuItem?.disabled} selected={isSelected} onClick={handleClick}>
        <ListItemIcon>
          <IconRender icon={menuItem?.icon} level={level && level} isSelected={isSelected} />
        </ListItemIcon>
        <ListItemText primary={menuItem?.title || 'Generic Title'} sx={{ whiteSpace: 'normal' }} />
      </ListItemButton>
    </>
  );
}

interface MenuItemProps {
  menuItem: IMenuItem;
  level?: number;
  sx?: SxProps;
}

export default MenuItem;

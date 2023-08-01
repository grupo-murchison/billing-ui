import { Ref, forwardRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { SxProps } from '@mui/material/styles';

import { IconRender } from './MenuComponents';
import { IMenuItem } from '../menu-items.interface';
import { useSidebarContext } from '../../context/useSidebarContext';

function MenuItem({ menuItem, level }: MenuItemProps) {
  const { isActive, toogleActiveMenu, toogleSidebar } = useSidebarContext();

  // const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    if (document.location.pathname === menuItem.url) {
      toogleActiveMenu(menuItem?.id);
    }
  }, []);

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

  const handleClick = (dataItem: string) => {
    toogleSidebar(false);
    toogleActiveMenu(dataItem);
  };

  return (
    <>
      <ListItemButton
        {...listItemProps}
        disabled={menuItem?.disabled}
        selected={isActive.findIndex((id: string) => id === menuItem.id) > -1}
        onClick={() => handleClick(menuItem?.id)}
      >
        <ListItemIcon>
          <IconRender icon={menuItem?.icon} level={level && level} isActive={isActive} item={menuItem} />
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

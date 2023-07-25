import { Ref, forwardRef } from 'react';
import { Link } from 'react-router-dom';

import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { SxProps } from '@mui/material/styles';

import { IconRender } from './MenuComponents';
import { IMenuItem } from '../menu-items.interface';
import { useSidebarContext } from '../../context/useSidebarContext';

function MenuItem({ menuItem, level }: MenuItemProps) {
  const { isMenuActive } = useSidebarContext();
  // const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  // const itemHandler = (id: string) => {
  //   dispatch({ type: ACTION_TYPES.MENU_OPEN, id });
  //   if (matchesSM) toogleSidebar(true);
  // };

  // active menu item on page load

  // //TODO mmm esto???
  // useEffect(() => {
  // const currentIndex = document.location.pathname
  //   .toString()
  //   .split('/')
  //   .findIndex(id => id === menuItem.id);

  // console.log('current', currentIndex);
  //   if (currentIndex > -1) {
  //     dispatch({ type: ACTION_TYPES.MENU_OPEN, id: menuItem.id });
  //   }
  //   // eslint-disable-next-line
  // }, []);

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

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        {...listItemProps}
        disabled={menuItem?.disabled}
        // selected={isActive.findIndex((id: string | number) => id === menuItem.id) > -1}
      >
        <ListItemIcon>
          <IconRender
            icon={menuItem?.icon}
            level={level && level}
            //TODO falta resolver el isActive (Nano)
            isActive={isMenuActive === menuItem.id}
            item={menuItem}
          />
        </ListItemIcon>
        <ListItemText primary={menuItem?.title || 'Generic Title'} sx={{ whiteSpace: 'normal' }} />
      </ListItemButton>
    </ListItem>
  );
}

interface MenuItemProps {
  menuItem: IMenuItem;
  level?: number;
  sx?: SxProps;
}

export default MenuItem;

import { useEffect, useState } from 'react';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuItem from './MenuItem';
import { IconRender } from './components';
import { IMenuItemCollapse } from '../interfaces/menu-items.interface';
import { useLayoutContext } from '../context/useLayoutContext';

function MenuItemCollapse({ menuItem, level }: { menuItem: IMenuItemCollapse; level?: number }) {
  const { isSidebarOpen, isMenuExpanded, toogleOpenMenu } = useLayoutContext();
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  useEffect(() => {
    setIsMenuActive(false);
    menuItem.children.map(data => {
      if (document.location.pathname === data.url) {
        setIsMenuActive(true);
      }
    });
  }, [document.location.pathname]);

  const expand = isSidebarOpen && isMenuExpanded.findIndex((id: string) => id === menuItem.id) > -1;

  const handleMouseEnter = () => {
    !expand && toogleOpenMenu(menuItem.id);
  };

  return (
    <>
      <ListItemButton onMouseEnter={handleMouseEnter} selected={isMenuActive}>
        <ListItemIcon>
          <IconRender icon={menuItem?.icon || InboxIcon} level={level} />
        </ListItemIcon>
        <ListItemText primary={menuItem?.title} />
        {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>

      <Collapse in={expand} timeout={800} unmountOnExit>
        <List component='div' disablePadding>
          {menuItem?.children?.map(item => (
            <MenuItem key={item.id} menuItem={item} level={1} />
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default MenuItemCollapse;

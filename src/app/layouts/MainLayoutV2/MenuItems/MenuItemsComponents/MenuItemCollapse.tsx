import { useEffect } from 'react';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuItem from './MenuItem';
import { IconRender } from './MenuComponents';
import { IMenuItemCollapse } from '../menu-items.interface';
import { useSidebarContext } from '../../context/useSidebarContext';

function MenuItemCollapse({ menuItem, level }: { menuItem: IMenuItemCollapse; level?: number }) {
  const { isSidebarOpen, isMenuActive, toogleOpenMenu } = useSidebarContext();

  useEffect(() => {
    if (!isSidebarOpen) {
      toogleOpenMenu('');
    }
  }, [isSidebarOpen]);

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton onClick={() => toogleOpenMenu(menuItem.id)}>
        <ListItemIcon>
          <IconRender icon={menuItem?.icon || InboxIcon} level={level} item={menuItem} />
        </ListItemIcon>
        <ListItemText primary={menuItem?.title} />
        {isMenuActive == menuItem.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>

      <Collapse in={isMenuActive == menuItem.id} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {menuItem?.children?.map(item => (
            <MenuItem key={item.id} menuItem={item} level={1} />
          ))}
        </List>
      </Collapse>
    </ListItem>
  );
}

export default MenuItemCollapse;

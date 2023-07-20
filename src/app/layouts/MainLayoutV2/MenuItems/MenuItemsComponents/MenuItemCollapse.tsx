import { useState } from 'react';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuItem from './MenuItem';
import { IconRender } from './MenuComponents';
import { IMenuItemCollapse } from '../menu-items.interface';
import { useSidebarContext } from '../../context/useSidebarContext';

function MenuItemCollapse({ menuItem, level }: { menuItem?: IMenuItemCollapse; level?: number }) {
  const { isSidebarOpen } = useSidebarContext();
  const [expand, setExpand] = useState(false);

  const handleOnClick = () => {
    setExpand(!expand);
  };

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton onClick={handleOnClick}>
        <ListItemIcon>
          <IconRender icon={menuItem?.icon || InboxIcon} level={level} item={menuItem} />
        </ListItemIcon>
        <ListItemText primary={menuItem?.title} />
        {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>

      <Collapse in={expand} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {menuItem?.children?.map(item => (
            <MenuItem key={item.id} menuItem={item} level={1} isOpen={isSidebarOpen} />
          ))}
        </List>
      </Collapse>
    </ListItem>
  );
}

export default MenuItemCollapse;

import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';

import MenuItem from './MenuItem';
import { IconRender } from './MenuComponents';
import { ListItemButton, ListItemIcon } from '@mui/material';
import { IMenuItemCollapse } from '../menu-items.interface';

export default function ContextualMenu({ menuItem }: { menuItem?: IMenuItemCollapse }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={(!open && menuItem?.title) || false} arrow placement='right'>
          {/* <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <IconRender icon={menuItem?.icon} level={1} item={menuItem} />
          </IconButton> */}

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <IconRender icon={menuItem?.icon} level={1} item={menuItem} />
            </ListItemIcon>
          </ListItemButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            'overflow': 'visible',
            'filter': 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            'mt': 1.5,
            'ml': '4rem',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 30,
              // rigth: 14,
              width: 10,
              height: 20,
              bgcolor: 'background.paper',
              transform: 'translateY(50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'center' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
      >
        {menuItem?.children?.map(item => (
          <MenuItem key={item.id} menuItem={item} sx={{ pl: 4 }} level={1} isOpen={open}/>
        ))}
      </Menu>
    </React.Fragment>
  );
}

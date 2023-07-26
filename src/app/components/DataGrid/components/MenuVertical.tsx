import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import { IconButton, Menu } from '@mui/material';
import { GridMoreVertIcon } from '@mui/x-data-grid';

const options = [
  { label: 'Ver', icon: '', caption: '' },
  { label: 'Editar', icon: '', caption: '' },
  { label: 'Eliminar', icon: '', caption: '' },
];

export default function IconMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ITEM_HEIGHT = 48;

  return (
    <div>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
        sx={{
          backgroundColor: '#FFF',
          border: 'solid 0.8px'
        }}
      >
        <GridMoreVertIcon />
      </IconButton>
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            //   selected={option === 'Pyxis'}
            onClick={handleClose}
          >
            <ListItemIcon>
              {option.icon}
              {/* <ContentCut fontSize='small' /> */}
            </ListItemIcon>
            <ListItemText>{option.label}</ListItemText>
            <Typography variant='body2' color='text.secondary'>
              {option.caption}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
      {/* <MenuList>
        <MenuItem>
          <ListItemIcon>
            <ContentCut fontSize='small' />
          </ListItemIcon>
          <ListItemText>Cut</ListItemText>
          <Typography variant='body2' color='text.secondary'>
            ⌘X
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize='small' />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
          <Typography variant='body2' color='text.secondary'>
            ⌘C
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize='small' />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
          <Typography variant='body2' color='text.secondary'>
            ⌘V
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize='small' />
          </ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem>
      </MenuList> */}
    </div>
  );
}

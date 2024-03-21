import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import { IconButton, Menu, useTheme } from '@mui/material';
import { GridMoreVertIcon } from '@mui/x-data-grid';

const options = [
  { label: 'Ver', icon: '', caption: '' },
  { label: 'Editar', icon: '', caption: '' },
  { label: 'Eliminar', icon: '', caption: '' },
];

export default function IconMenu({ options: optionsProp }: { options?: IMenuOptions[] }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ITEM_HEIGHT = 48;
  const _options = optionsProp ? optionsProp : options;

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
          'backgroundColor': theme.palette.common.white,
          'boxShadow': '0px 0px 4px 0px rgba(0, 0, 0, 0.32)',
          ':hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            transition: 'ease-out',
            transitionDuration: '0.3s',
          },
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
        {_options.map((option, index) => (
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

interface IMenuOptions {
  label: string;
  icon?: string;
  caption?: string;
}

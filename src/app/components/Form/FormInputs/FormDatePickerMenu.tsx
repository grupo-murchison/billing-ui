import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconButton, Menu } from '@mui/material';
import {
  CheckIcon,
  EqualIcon,
  FilterAltIcon,
  HeightIcon,
  KeyboardArrowLeftIcon,
  KeyboardArrowRightIcon,
} from '@assets/icons';

export default function FormDatePickerMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        onClick={handleClick}
        size='small'
        sx={{ ml: 2, width: 32, height: 32 }}
        aria-controls={open ? 'filter-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
      >
        <FilterAltIcon />
      </IconButton>
      <Paper sx={{ width: 320, maxWidth: '100%' }}>
        <Menu anchorEl={anchorEl} id='filter-menu' open={open} onClose={handleClose} onClick={handleClose}>
          <MenuItem>
            <ListItemIcon>
              <EqualIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Igual</ListItemText>
            <ListItemIcon sx={{ pl: 3, pr: 0 }}>
              {/* <CheckIcon color='primary' /> */}
            </ListItemIcon>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <KeyboardArrowRightIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Mayor o Igual a</ListItemText>
            <ListItemIcon>{/* <CheckIcon color='primary' /> */}</ListItemIcon>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <KeyboardArrowLeftIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Menor o Igual a</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <HeightIcon fontSize='small' sx={{ transform: 'rotate(90deg)' }} />
            </ListItemIcon>
            <ListItemText>Entre</ListItemText>
            <ListItemIcon sx={{ pl: 3, pr: 0 }}>
              <CheckIcon color='primary' />
            </ListItemIcon>
          </MenuItem>
        </Menu>
      </Paper>
    </>
  );
}

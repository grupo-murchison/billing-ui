import React from 'react';
import { alpha } from '@mui/material/styles';
import DeleteDialog from '@components/Dialogs';
import { Link } from 'react-router-dom';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Alert,
  Button,
  Snackbar,
} from '@design-system/grid';
import { DeleteIcon, EditIcon, AddIcon, FilterListIcon } from '@design-system/icons';

// import { BarChart, DispersionChart, PieChart } from './Charts';

import './styles.scss';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'Id',
  },
  {
    id: 'userName',
    numeric: true,
    disablePadding: false,
    label: 'Usuario',
  },
  {
    id: 'agrupacion',
    numeric: true,
    disablePadding: false,
    label: 'Agrupación',
  },
  {
    id: 'codigo',
    numeric: true,
    disablePadding: false,
    label: 'Código',
  },
  {
    id: 'descripcion',
    numeric: true,
    disablePadding: false,
    label: 'Descripcion',
  },
];

const TableHeader = (props: TableHeaderProps) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? <Box component='span'></Box> : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell key={'actions'} align={'center'} padding={'normal'}>
          Acciones
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

const TableToolbar = (props: TableToolbarProps) => {
  const { numSelected } = props;
  const [open, setOpen] = React.useState(false);
  const [deletedAlert, setDeletedAlert] = React.useState(false);

  const handleClickOpen = React.useCallback(() => {
    setOpen(true);
  }, []);
  const handleDelete = () => {
    setOpen(false);
    setDeletedAlert(true);
    console.log('elimina el registro');
  };
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setDeletedAlert(false);
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
          {numSelected} seleccionados
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
          Producto Softland
        </Typography>
      )}
      <Snackbar
        open={deletedAlert}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Los registros han sido eliminados
        </Alert>
      </Snackbar>
      {numSelected > 0 ? (
        <>
          <Tooltip title='Eliminar'>
            <IconButton onClick={handleClickOpen}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <DeleteDialog handleSave={handleDelete} count={numSelected} open={open} setOpen={setOpen} />
        </>
      ) : (
        <>
          <IconButton>
            <Link to={`/productosoftland`} style={{ textDecoration: 'none' }}>
              <Button variant='contained'>
                {` Agregar Nuevo `} <AddIcon style={{ paddingLeft: '7' }} />
              </Button>
            </Link>
          </IconButton>
          <Tooltip title='Filtros'>
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
};

const DataTable = (props: DataTableProps) => {
  const { rows } = props;
  const [open, setOpen] = React.useState(false);
  const [deletedAlert, setDeletedAlert] = React.useState(false);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('userName');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows?.map((n: Data) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleClickOpen = React.useCallback(() => {
    setOpen(true);
  }, []);
  const handleDelete = () => {
    setOpen(false);
    console.log('elimina el registro');
    setDeletedAlert(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setDeletedAlert(false);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size='small'>
            <TableHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                ?.slice()
                ?.sort(getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row: Data, index: any) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          onClick={event => handleClick(event, row.id)}
                          color='primary'
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell component='th' id={labelId} scope='row' padding='none'>
                        {row.id}
                      </TableCell>
                      <TableCell align='right'>{row.userName}</TableCell>
                      <TableCell align='right'>{row.agrupacion}</TableCell>
                      <TableCell align='right'>{row.codigo}</TableCell>
                      <TableCell align='right'>{row.descripcion}</TableCell>
                      <TableCell align='right'>
                        <Tooltip title='Editar'>
                          <IconButton>
                            <EditIcon style={{ color: '#9B59B6' }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Eliminar'>
                          <IconButton onClick={handleClickOpen}>
                            <DeleteIcon style={{ color: '#C62828' }} />
                          </IconButton>
                        </Tooltip>

                        <DeleteDialog handleSave={handleDelete} count={selected.length} open={open} setOpen={setOpen} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage='Resultados por página'
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          rowsPerPageOptions={[2, 50, 100, 200]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Snackbar
        open={deletedAlert}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          El registro ha sido eliminado
        </Alert>
      </Snackbar>
      {/* <div className='Graph'>
        <BarChart datos={rows} />
        <PieChart datos={rows} />
        <DispersionChart datos={rows} />
      </div> */}
    </Box>
  );
};

interface Data {
  id: number;
  userName: string;
  agrupacion: string;
  codigo: string;
  descripcion: string;
}

interface TableToolbarProps {
  numSelected: number;
}

interface DataTableProps {
  rows: Data[];
}

interface TableHeaderProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export default DataTable;

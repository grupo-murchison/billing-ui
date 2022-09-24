import { useContext } from 'react';

import TableCell from '@mui/material/TableCell';
import MUITableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { DataGridContext } from '@app/components/DataGrid/contexts';

import { UuidLib } from '@libs';

const TableHead = () => {
  const { columnHeads } = useContext(DataGridContext);

  return (
    <MUITableHead>
      <TableRow>
        {columnHeads.map(colHead => (
          <TableCell key={UuidLib.newUuid()} align='center'>
            {colHead.label}
          </TableCell>
          // <TableCell
          //   key={colHead.id}
          //   align={colHead.numeric ? 'right' : 'left'}
          //   padding={colHead.disablePadding ? 'none' : 'normal'}
          //   sortDirection={orderBy === colHead.id ? order : false}
          // >
          //   <TableSortLabel
          //     active={orderBy === colHead.id}
          //     direction={orderBy === colHead.id ? order : 'asc'}
          //     onClick={createSortHandler(colHead.id)}
          //   >
          //     {colHead.label}
          //     {orderBy === colHead.id ? (
          //       <Box component='span'>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
          //     ) : null}
          //   </TableSortLabel>
          // </TableCell>
        ))}
      </TableRow>
    </MUITableHead>
  );
};

export default TableHead;

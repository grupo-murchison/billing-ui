import { useContext, useMemo } from 'react';

import MUITableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';

import { DataGridContext } from '@app/components/DataGrid/contexts';

import { UuidLib } from '@libs';

const TableBody = () => {
  const { rowTemplate, rows, rowsCount } = useContext(DataGridContext);

  const emptyRowsCount = useMemo(() => {
    return 10 - rowsCount;
  }, [rowsCount]);

  return (
    <MUITableBody>
      {rows.map(row => {
        return (
          <TableRow
            hover
            role='checkbox'
            // aria-checked={isItemSelected}
            tabIndex={-1}
            key={UuidLib.newUuid()}
            // selected={isItemSelected}
          >
            {/* <TableCell padding='checkbox'>
              <Checkbox color='primary' checked={isItemSelected} />
            </TableCell> */}
            {rowTemplate(row)}
          </TableRow>
        );
      })}
      {emptyRowsCount > 0 && (
        <TableRow
          style={{
            height: 53 * emptyRowsCount,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </MUITableBody>
  );
};

export default TableBody;

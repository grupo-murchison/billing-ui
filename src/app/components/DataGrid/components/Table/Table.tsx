import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';

import { TableHead, TableBody } from '@app/components/DataGrid/components/Table/components';

const DataGridTable = () => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
        <TableHead />
        <TableBody />
      </Table>
    </TableContainer>
  );
};

export default DataGridTable;

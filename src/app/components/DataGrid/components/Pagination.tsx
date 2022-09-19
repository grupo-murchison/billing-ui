import { useContext } from 'react';

import TablePagination from '@mui/material/TablePagination';

import { DataGridContext } from '@app/components/DataGrid/contexts';

const DataGridPagination = () => {
  const { currentPage, handleChangeRowsPerPage, handlePageChange, rowsPerPage, rowsTotalCount } =
    useContext(DataGridContext);

  return (
    <TablePagination
      rowsPerPageOptions={[10, 25, 50, 100]}
      component='div'
      count={rowsTotalCount}
      rowsPerPage={rowsPerPage}
      page={currentPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default DataGridPagination;

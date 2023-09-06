import { useContext } from 'react';

import { DataGridContext } from './contexts';
import DataGridBase from './DataGridBase';

const DataGridWithContext = () => {
  const { rowsTotalCount, paginationModel, handlePaginationModelChange, ...props } = useContext(DataGridContext);

  return (
    <>
      <DataGridBase
        {...props}
        paginationMode='server'
        rowCount={rowsTotalCount}
        paginationModel={{ ...paginationModel }}
        onPaginationModelChange={handlePaginationModelChange}
      />
    </>
  );
};

export default DataGridWithContext;

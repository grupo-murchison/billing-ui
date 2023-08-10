import { useContext } from 'react';

import { DataGridContext } from './contexts';
import DataGridBase from './DataGridBase';

const DataGridWithContext = () => {
  const { columns, rows, loading, toolbar: Toolbar, ...props } = useContext(DataGridContext);

  return (
    <>
      <DataGridBase rows={rows} columns={columns} loading={loading} {...props} />
    </>
  );
};

export default DataGridWithContext;

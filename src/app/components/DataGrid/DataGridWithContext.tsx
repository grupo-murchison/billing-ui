import { useContext } from 'react';

import { DataGridContext } from './contexts';
import DataGridBase from './DataGridBase';

const DataGridWithContext = () => {
  const {
    columnHeads: columns,
    rows,
    loading,
    toolbar: Toolbar,
  } = useContext(DataGridContext);

  // Repartir el espacio en partes iguales
  columns.forEach((col: any) => {
    col['flex'] = col?.flex ? col.flex : 1;
  });

  return (
    <>
      <DataGridBase rows={rows} columns={columns} pageSizeOptions={[10, 25, 50, 100]} loading={loading} />
    </>
  );
};

export default DataGridWithContext;

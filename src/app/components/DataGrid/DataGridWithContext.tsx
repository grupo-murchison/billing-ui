import { useContext } from 'react';

import { DataGridContext } from './contexts';
import DataGridBase from './DataGridBase';

const DataGridWithContext = () => {
  const { ...props } = useContext(DataGridContext);

  return (
    <>
      <DataGridBase {...props} />
    </>
  );
};

export default DataGridWithContext;

import { DataGridProvider } from './contexts';
import { DataGridProps } from './contexts/types';
import DataGridWithContext from './DataGridWithContext';

const DataGrid = <T,>(props: DataGridProps<T>) => {
  return (
    <DataGridProvider {...props}>
      {/* <Toolbar /> */}

      <DataGridWithContext />
    </DataGridProvider>
  );
};

export default DataGrid;

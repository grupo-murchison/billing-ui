import { RepositoryParams } from '@app/components/DataGrid/contexts/types';
import { useCallback, useRef } from 'react';

type LoadConfig = { fixedFilters?: RepositoryParams; filters?: RepositoryParams };

type UseDataGridRefType = { load: (config?: LoadConfig) => void; reload: () => void; };

const initialState = {
  load() {
    return;
  },
  reload() {
    return;
  }
};

const useDataGrid = () => {
  const ref = useRef<UseDataGridRefType>(initialState);

  const load = useCallback((config?: LoadConfig) => {
    ref.current.load(config);
  }, []);

  const reload = useCallback(() => {
    ref.current.reload();
  }, []);

  return { ref, load, reload };
};

const initialValues: ReturnType<typeof useDataGrid> = {
  ref: { current: { ...initialState } },
  ...initialState,
};

useDataGrid.initialValues = initialValues;

export default useDataGrid;

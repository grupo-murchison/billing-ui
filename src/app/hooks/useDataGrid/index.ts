import { RepositoryParams } from '@app/components/DataGrid/contexts/types';
import { useCallback, useRef } from 'react';

type LoadConfig = { fixedFilters?: RepositoryParams; filters?: RepositoryParams };

const useDataGrid = () => {
  const ref = useRef<{
    load: (config?: LoadConfig) => void;
    reload: () => void;
  }>({
    load() {
      return;
    },
    reload() {
      return;
    },
  });

  const load = useCallback((config?: LoadConfig) => {
    ref.current.load(config);
  }, []);

  const reload = useCallback(() => {
    ref.current.reload();
  }, []);

  return { ref, load, reload };
};

const initialValues: ReturnType<typeof useDataGrid> = {
  ref: {
    current: {
      load() {
        return;
      },
      reload() {
        return;
      },
    },
  },
  load() {
    return;
  },
  reload() {
    return;
  },
};

useDataGrid.initialValues = initialValues;

export default useDataGrid;

import { useCallback, useRef } from 'react';

const useDataGrid = () => {
  const ref = useRef<{
    load: () => void;
    reload: () => void;
  }>({
    load() {
      return;
    },
    reload() {
      return;
    },
  });

  const load = useCallback(() => {
    ref.current.load();
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

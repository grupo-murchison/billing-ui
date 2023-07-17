import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';

import { DataGridProviderProps, DataGridRepositoryFuncParams } from './types';

const initialContext: InitialContext = {
  columnHeads: [],
  currentPage: 0,
  onClickNew: () => {
    return;
  },
  handleChangeRowsPerPage: () => {
    return;
  },
  handleNextPageChange: () => {
    return;
  },
  handlePrevPageChange: () => {
    return;
  },
  rows: [],
  rowsCount: 0,
  rowsPerPage: 50,
  rowsTotalCount: 0,
  loading: true,
  error: null,
};

const DataGridContext = createContext(initialContext);

const DataGridProvider = <T,>({
  hookRef,
  columnHeads,
  onClickNew,
  repositoryFunc,
  children,
}: DataGridProviderProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(initialContext.currentPage);
  const [rowsPerPage, setRowsPerPage] = useState<number>(initialContext.rowsPerPage);
  const [rowsTotalCount, setRowsTotalCount] = useState<number>(initialContext.rowsTotalCount);
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [loading, setLoading] = useState<boolean>(initialContext.loading);
  const [error, setError] = useState<any>(initialContext.error);

  const repositoryFuncParamsRef = useRef<DataGridRepositoryFuncParams>({
    page: initialContext.currentPage + 1,
    take: initialContext.rowsPerPage,
    filters: {},
  });

  const rowsCount = useMemo(() => {
    return rows.length;
  }, [rows]);

  const makeRequest = useCallback((config?: { filters?: Record<string, AnyValue> }) => {
    repositoryFunc({
      ...repositoryFuncParamsRef.current,
      ...repositoryFuncParamsRef.current.filters,
      ...config?.filters,
    })
      .then(response => {
        if (response.data) {
          setRows(response.data.data as GridRowsProp);
          setRowsTotalCount(response.data.meta.itemCount);
        }
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleNextPageChange = useCallback(() => {
    setCurrentPage(lastPage => {
      const newPage = lastPage + 1;

      repositoryFuncParamsRef.current = {
        ...repositoryFuncParamsRef.current,
        page: newPage,
      };

      makeRequest();

      return newPage;
    });
  }, [makeRequest]);

  const handlePrevPageChange = useCallback(() => {
    setCurrentPage(lastPage => {
      const newPage = lastPage - 1;

      repositoryFuncParamsRef.current = {
        ...repositoryFuncParamsRef.current,
        page: newPage,
      };

      makeRequest();

      return newPage;
    });
  }, [makeRequest]);

  const handleChangeRowsPerPage = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);

    repositoryFuncParamsRef.current = {
      ...repositoryFuncParamsRef.current,
      page: 1,
      take: parseInt(event.target.value, 10),
    };
    makeRequest();
  }, []);

  useEffect(() => {
    hookRef.current = {
      load: config => {
        repositoryFuncParamsRef.current.filters = config?.fixedFilters;
        makeRequest();
      },
      reload: makeRequest,
    };
  }, [makeRequest]);

  return (
    <DataGridContext.Provider
      value={{
        columnHeads,
        currentPage,
        handleChangeRowsPerPage,
        handleNextPageChange,
        handlePrevPageChange,
        onClickNew,
        rows,
        rowsCount,
        rowsPerPage,
        rowsTotalCount,
        loading,
        error,
      }}
    >
      {children}
    </DataGridContext.Provider>
  );
};

type InitialContext = {
  columnHeads: GridColDef[];
  currentPage: number;
  onClickNew?: () => void;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleNextPageChange: () => void;
  handlePrevPageChange: () => void;
  rows: GridRowsProp;
  rowsCount: number;
  rowsPerPage: number;
  rowsTotalCount: number;
  loading: boolean;
  error: any;
};

export { DataGridContext as DataGridContext, DataGridProvider };

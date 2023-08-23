import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { GridRowsProp } from '@mui/x-data-grid';

import { DataGridContext } from './DataGridContext';
import { DataGridProviderProps, DataGridRepositoryFuncParams, RepositoryParams } from './types';
import { initialContext } from '../constants';

const DataGridProvider = <T,>({
  hookRef,
  columns,
  onClickNew,
  repositoryFunc,
  children,
  toolbar,
  getRows,
}: DataGridProviderProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(initialContext.currentPage);
  const [rowsPerPage, setRowsPerPage] = useState<number>(initialContext.rowsPerPage);
  const [rowsTotalCount, setRowsTotalCount] = useState<number>(initialContext.rowsTotalCount);
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [loading, setLoading] = useState<boolean>(initialContext.loading);
  const [error, setError] = useState<AnyValue>(initialContext.error);

  const repositoryFuncParamsRef = useRef<DataGridRepositoryFuncParams>({
    page: initialContext.currentPage + 1,
    take: initialContext.rowsPerPage,
    filters: {},
  });

  const rowsCount = useMemo(() => {
    return rows.length;
  }, [rows]);

  const makeRequest = useCallback((config?: { filters?: RepositoryParams }) => {
    loading !== true && setLoading(true);
    const { filters: currentFilters, ...rest } = repositoryFuncParamsRef.current;
    repositoryFunc({
      ...rest,
      ...currentFilters,
      ...config?.filters,
    })
      .then(({ data }) => {
        if (data) {
          setRows(data.data as GridRowsProp);
          setRowsTotalCount(data.meta.itemCount);
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

  getRows && getRows(rows);

  return (
    <DataGridContext.Provider
      value={{
        columns,
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
        toolbar,
      }}
    >
      {children}
    </DataGridContext.Provider>
  );
};

export { DataGridProvider };

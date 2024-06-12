import { useCallback, useEffect, useRef, useState } from 'react';
import { GridPaginationModel, GridRowsProp } from '@mui/x-data-grid';

import { DataGridContext } from './DataGridContext';
import { DataGridProviderProps, DataGridRepositoryFuncParams, RepositoryParams } from './types';
import { initialContext } from '../constants';

const DataGridProvider = <T,>({
  hookRef,
  repositoryFunc,
  children,
  getRows,
  ...props
}: DataGridProviderProps<T>) => {
  const [rowsTotalCount, setRowsTotalCount] = useState<number>(initialContext.rowsTotalCount);
  const [rows, setRows] = useState<GridRowsProp>(initialContext.rows);
  const [loading, setLoading] = useState<boolean>(initialContext.loading);
  const [error, setError] = useState<AnyValue>(initialContext.error);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ ...initialContext.paginationModel });

  const repositoryFuncParamsRef = useRef<DataGridRepositoryFuncParams>({
    page: initialContext.paginationModel.page + 1,
    take: initialContext.paginationModel.pageSize,
    filters: {},
  });

  const makeRequest = useCallback((config?: { filters?: RepositoryParams }) => {
    setLoading(true);
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
        setRows(initialContext.rows);
        setRowsTotalCount(initialContext.rowsTotalCount);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handlePaginationModelChange = useCallback((model: GridPaginationModel) => {
    setPaginationModel({ ...model });
    repositoryFuncParamsRef.current = {
      ...repositoryFuncParamsRef.current,
      page: model.page + 1,
      take: model.pageSize,
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
        ...props,
        rows,
        rowsTotalCount,
        loading,
        error,
        paginationModel,
        handlePaginationModelChange,
      }}
    >
      {children}
    </DataGridContext.Provider>
  );
};

export { DataGridProvider };

import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';

import {
  DataGridProviderProps,
  DataGridColumnHeadProps,
  DataGridRepositoryFuncParams,
} from '@app/components/DataGrid/utils/types';

const initialContext: InitialContext = {
  columnHeads: [],
  currentPage: 0,
  handleChangeRowsPerPage: () => {
    return;
  },
  handlePageChange: () => {
    return;
  },
  rowTemplate: () => <></>,
  rows: [],
  rowsCount: 0,
  rowsPerPage: 100,
  rowsTotalCount: 0,
};

const DataGridContext = createContext(initialContext);

const DataGridProvider = <T,>({
  hookRef,
  columnHeads,
  rowTemplate,
  repositoryFunc,
  children,
}: DataGridProviderProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(initialContext.currentPage);
  const [rowsPerPage, setRowsPerPage] = useState<number>(initialContext.rowsPerPage);
  const [rowsTotalCount, setRowsTotalCount] = useState<number>(initialContext.rowsTotalCount);
  const [rows, setRows] = useState<AnyValue[]>([]);

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
    }).then(response => {
      if (response.data) {
        setRows(response.data.data);
        setRowsTotalCount(response.data.meta.itemCount);
      }
    });
  }, []);

  const handlePageChange = useCallback((event: unknown, newPage: number) => {
    setCurrentPage(newPage);

    repositoryFuncParamsRef.current = {
      ...repositoryFuncParamsRef.current,
      page: newPage + 1,
    };
    makeRequest();
  }, []);

  const handleChangeRowsPerPage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
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
        handlePageChange,
        rowTemplate,
        rows,
        rowsCount,
        rowsPerPage,
        rowsTotalCount,
      }}
    >
      {children}
    </DataGridContext.Provider>
  );
};

type InitialContext = {
  columnHeads: DataGridColumnHeadProps[];
  currentPage: number;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePageChange: (event: unknown, newPage: number) => void;
  rowTemplate: (row: AnyValue) => ReactNode;
  rows: AnyValue[];
  rowsCount: number;
  rowsPerPage: number;
  rowsTotalCount: number;
};

export { DataGridContext, DataGridProvider };

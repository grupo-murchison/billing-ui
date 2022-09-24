import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';

import { DataGridProviderProps, DataGridColumnHeadProps } from '@app/components/DataGrid/utils/types';

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

const DataGridProvider = <T,>({ columnHeads, rowTemplate, repositoryFunc, children }: DataGridProviderProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(initialContext.currentPage);
  const [rowsPerPage, setRowsPerPage] = useState<number>(initialContext.rowsPerPage);
  const [rows, setRows] = useState<AnyValue[]>([]);

  const rowsCount = useMemo(() => {
    return rows.length;
  }, [rows]);

  const rowsTotalCount = useMemo(() => {
    // TODO This should be all rows count!
    return rows.length;
  }, [rows]);

  const handlePageChange = useCallback((event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  }, []);

  useEffect(() => {
    repositoryFunc().then(response => {
      if (response.data) {
        setRows(response.data);
      }
    });
  }, [repositoryFunc]);

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

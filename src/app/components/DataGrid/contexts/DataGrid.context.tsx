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
  handleSelectAllCurentRows: () => {
    return;
  },
  rowTemplate: () => <></>,
  rows: [],
  rowsCount: 0,
  rowsPerPage: 100,
  rowsTotalCount: 0,
  selectedRowsCount: 0,
};

const DataGridContext = createContext(initialContext);

const DataGridProvider = ({ columnHeads, rowTemplate, repositoryFunc, children }: DataGridProviderProps) => {
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

  const selectedRowsCount = useMemo(() => {
    return 0;
  }, []);

  const handleSelectAllCurentRows = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // const newSelected = rows.map(n => n.name);
      // setSelected(newSelected);
      // return;
    }
    // setSelected([]);
  }, []);

  const handlePageChange = useCallback((event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  }, []);

  useEffect(() => {
    repositoryFunc().then(data => {
      if (data.data) {
        setRows(data.data);
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
        handleSelectAllCurentRows,
        rowTemplate,
        rows,
        rowsCount,
        rowsPerPage,
        rowsTotalCount,
        selectedRowsCount,
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
  handleSelectAllCurentRows: (event: ChangeEvent<HTMLInputElement>) => void;
  rowTemplate: (row: AnyValue) => ReactNode;
  rows: AnyValue[];
  rowsCount: number;
  rowsPerPage: number;
  rowsTotalCount: number;
  selectedRowsCount: number;
};

export { DataGridContext, DataGridProvider };

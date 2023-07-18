import type { ChangeEvent, JSXElementConstructor, ReactNode } from 'react';

import type { AxiosResponse } from 'axios';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';

export type DataGridProviderProps<T> = { children: ReactNode } & DataGridProps<T>;

export type DataGridProps<T> = {
  hookRef: React.MutableRefObject<{
    load: (config?: { fixedFilters?: Record<string, AnyValue>; filters?: Record<string, AnyValue> }) => void;
    reload: () => void;
  }>;
  columnHeads: GridColDef[];
  onClickNew?: () => void;
  repositoryFunc: (params: DataGridRepositoryFuncParams) => Promise<
    AxiosResponse<{
      data: T[];
      meta: {
        itemCount: number;
      };
    }>
  >;
  toolbar?: JSXElementConstructor<any> | null | undefined;
};

export type DataGridRepositoryFuncParams = {
  take: number;
  page: number;
  filters?: Record<string, string>;
};

export type InitialContext = {
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
  toolbar?: JSXElementConstructor<any> | null | undefined;
};

import type { ChangeEvent, JSXElementConstructor, ReactNode } from 'react';

import type { AxiosResponse } from 'axios';
import { GridColDef, GridRowsProp, DataGridProps as MUIDataGridProps } from '@mui/x-data-grid';

export type DataGridProviderProps<T> = { children: ReactNode } & DataGridProps<T>;

export interface DataGridProps<T> extends Omit<MUIDataGridProps, 'rows'> {
  hookRef: React.MutableRefObject<{
    load: (config?: { fixedFilters?: RepositoryParams; filters?: RepositoryParams }) => void;
    reload: () => void;
  }>;
  columns: GridColDef[];
  onClickNew?: () => void;
  repositoryFunc: (params: Record<string, unknown>) => Promise<
    AxiosResponse<{
      data: T[];
      meta: {
        itemCount: number;
      };
    }>
  >;
  toolbar?: JSXElementConstructor<AnyValue> | null | undefined;
  getRows?: (rows: AnyValue) => AnyValue;
}

export type DataGridRepositoryFuncParams = RepositoryFuncParamsPaginated & {
  filters?: RepositoryParams;
};

export type RepositoryFuncParamsPaginated = Record<'take' | 'page', number> | RepositoryParams;

export type RepositoryParams = Record<string, unknown>; // Record<string, AnyValue> || Record<string, string> => es un objeto par key-valor

export type InitialContext = {
  columns: GridColDef[];
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
  error: AnyValue;
  toolbar?: JSXElementConstructor<AnyValue> | null | undefined;
};

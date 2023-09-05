import type { JSXElementConstructor, ReactNode } from 'react';

import type { AxiosResponse } from 'axios';
import { GridColDef, GridPaginationModel, GridRowsProp, DataGridProps as MUIDataGridProps } from '@mui/x-data-grid';

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
  // currentPage: number;
  onClickNew?: () => void;
  handlePaginationModelChange: (model: GridPaginationModel) => void;
  rows: GridRowsProp;
  rowsTotalCount: number;
  loading: boolean;
  error: AnyValue;
  toolbar?: JSXElementConstructor<AnyValue> | null | undefined;
  paginationModel: { page: number; pageSize: number };
};

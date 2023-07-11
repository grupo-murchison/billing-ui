import type { ReactNode } from 'react';

import type { AxiosResponse } from 'axios';
import { GridColDef } from '@mui/x-data-grid';

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
};

export type DataGridRepositoryFuncParams = {
  take: number;
  page: number;
  filters?: Record<string, string>;
};

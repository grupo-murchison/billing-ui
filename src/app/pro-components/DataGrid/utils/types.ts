import type { ReactNode } from 'react';

import type { AxiosResponse } from 'axios';

export type DataGridProviderProps<T> = { children: ReactNode } & DataGridProps<T>;

export type DataGridProps<T> = {
  hookRef: React.MutableRefObject<{
    load: (config?: { fixedFilters?: Record<string, AnyValue>; filters?: Record<string, AnyValue> }) => void;
    reload: () => void;
  }>;
  columnHeads: DataGridColumnHeadProps[];
  onClickNew?: () => void;
  rowTemplate: (row: T) => ReactNode;
  repositoryFunc: (params: DataGridRepositoryFuncParams) => Promise<
    AxiosResponse<{
      data: T[];
      meta: {
        itemCount: number;
      };
    }>
  >;
};

export type DataGridColumnHeadProps = {
  headerName: string;
};

export type DataGridRepositoryFuncParams = {
  take: number;
  page: number;
  filters?: Record<string, string>;
};

import type { ReactNode } from 'react';

import type { AxiosResponse } from 'axios';

export type DataGridProviderProps<T> = { children: ReactNode } & DataGridProps<T>;

export type DataGridProps<T> = {
  columnHeads: DataGridColumnHeadProps[];
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
  label: string;
};

export type DataGridRepositoryFuncParams = {
  take: number;
  page: number;
  filters?: Record<string, string>;
};

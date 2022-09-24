import type { ReactNode } from 'react';

import type { AxiosResponse } from 'axios';

export type DataGridProviderProps<T> = { children: ReactNode } & DataGridProps<T>;

export type DataGridProps<T> = {
  columnHeads: DataGridColumnHeadProps[];
  rowTemplate: (row: T) => ReactNode;
  repositoryFunc: () => Promise<AxiosResponse<T[]>>;
};

export type DataGridColumnHeadProps = {
  label: string;
};

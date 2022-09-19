import type { ReactNode } from 'react';

export type DataGridProviderProps = { children: ReactNode } & DataGridProps;

export type DataGridProps = {
  columnHeads: DataGridColumnHeadProps[];
  rowTemplate: (row: AnyValue) => ReactNode;
  repositoryFunc: () => Promise<AnyValue>;
};

export type DataGridColumnHeadProps = {
  label: string;
};

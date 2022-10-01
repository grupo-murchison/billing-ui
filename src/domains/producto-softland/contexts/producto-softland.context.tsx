import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const ProductoSoftlandContext = createContext(initialContext);

const ProductoSoftlandProvider = ({ children }: ProductoSoftlandProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <ProductoSoftlandContext.Provider value={{ mainDataGrid }}>{children}</ProductoSoftlandContext.Provider>;
};

type ProductoSoftlandProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { ProductoSoftlandContext, ProductoSoftlandProvider };

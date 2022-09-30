import { createContext, useRef } from 'react';
import type { ReactNode } from 'react';

const initialContext: InitialContext = {
  tempRef: {
    current: {
      reloadTable() {
        return;
      },
    },
  },
};

const ProductoSoftlandContext = createContext(initialContext);

const ProductoSoftlandProvider = ({ children }: ProductoSoftlandProviderProps) => {
  const tempRef = useRef(initialContext.tempRef.current);

  return <ProductoSoftlandContext.Provider value={{ tempRef }}>{children}</ProductoSoftlandContext.Provider>;
};

type ProductoSoftlandProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  tempRef: React.MutableRefObject<{
    reloadTable: () => void;
  }>;
};

export { ProductoSoftlandContext, ProductoSoftlandProvider };

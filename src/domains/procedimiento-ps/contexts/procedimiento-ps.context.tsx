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

const ProcedimientoPSContext = createContext(initialContext);

const ProcedimientoPSProvider = ({ children }: ProcedimientoPSProviderProps) => {
  const tempRef = useRef(initialContext.tempRef.current);

  return <ProcedimientoPSContext.Provider value={{ tempRef }}>{children}</ProcedimientoPSContext.Provider>;
};

type ProcedimientoPSProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  tempRef: React.MutableRefObject<{
    reloadTable: () => void;
  }>;
};

export { ProcedimientoPSContext, ProcedimientoPSProvider };

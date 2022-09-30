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

const ProcedimientoPSIntervaloContext = createContext(initialContext);

const ProcedimientoPSIntervaloProvider = ({ children }: ProcedimientoPSIntervaloProviderProps) => {
  const tempRef = useRef(initialContext.tempRef.current);

  return (
    <ProcedimientoPSIntervaloContext.Provider value={{ tempRef }}>{children}</ProcedimientoPSIntervaloContext.Provider>
  );
};

type ProcedimientoPSIntervaloProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  tempRef: React.MutableRefObject<{
    reloadTable: () => void;
  }>;
};

export { ProcedimientoPSIntervaloContext, ProcedimientoPSIntervaloProvider };

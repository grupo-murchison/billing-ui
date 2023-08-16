import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

const initialContext: InitialContext = {
  setDialogNode: () => {
    return;
  },
};

// TODO buscar un nombre más apropiado acorde a la funcionalidad que provee este componente
const ComponentInjectorContext = createContext(initialContext);

const ComponentInjectorProvider = ({ children }: ComponentInjectorProviderProps) => {
  const [dialogNode, setDialogNode] = useState<ReactNode>();

  return (
    <ComponentInjectorContext.Provider value={{ setDialogNode }}>
      {children}
      {dialogNode}
    </ComponentInjectorContext.Provider>
  );
};

type ComponentInjectorProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  setDialogNode: React.Dispatch<React.SetStateAction<ReactNode>>;
};

export { ComponentInjectorContext, ComponentInjectorProvider };

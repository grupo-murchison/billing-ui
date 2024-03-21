import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

const initialContext: InitialContext = {
  setDialogNode: () => {
    return;
  },
};

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

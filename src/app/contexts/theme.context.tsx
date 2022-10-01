import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

const initialContext: InitialContext = {
  setDialogNode: () => {
    return;
  },
};

const ThemeContext = createContext(initialContext);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [dialogNode, setDialogNode] = useState<ReactNode>();

  return (
    <ThemeContext.Provider value={{ setDialogNode }}>
      {children}
      {dialogNode}
    </ThemeContext.Provider>
  );
};

type ThemeProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  setDialogNode: React.Dispatch<React.SetStateAction<ReactNode>>;
};

export { ThemeContext, ThemeProvider };

import { createContext, useReducer, Dispatch, useEffect } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';
import {
  ProcedimientoCustomState,
  reducer,
  initialState,
  ActionParam,
  ACTION_TYPES,
} from './procedimiento-custom.state';
import { FuncionRepository } from '@domains/funcion/repository';
import { EventoRepository } from '@domains/evento/repository';
import { EventoCampoRepository } from '@domains/evento-campo/repository';
import { AccionRepository } from '@domains/accion/repository';

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
  state: ProcedimientoCustomState;
  dispatch: Dispatch<ActionParam>;
  setEventoSelected: (prop: { payload: string }) => void;
};

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
  state: initialState,
  dispatch: () => null,
  setEventoSelected: () => undefined,
};

const ProcedimientoCustomContext = createContext(initialContext);

type ProcedimientoCustomProviderProps = {
  children?: ReactNode;
};

const ProcedimientoCustomProvider = ({ children }: ProcedimientoCustomProviderProps) => {
  const mainDataGrid = useDataGrid();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntities = async () => {
    try {
      const [{ data: funciones }, { data: eventos }, { data: eventosCampo }, { data: acciones }] = await Promise.all([
        await FuncionRepository.getAllFuncionAsDropdown(),
        await EventoRepository.getAllEventoAsDropdown(),
        await EventoCampoRepository.getAllEventoCampoAsDropdown(),
        await AccionRepository.getAllAccionAsDropdown(),
      ]);

      dispatch({
        type: ACTION_TYPES.SET_ENTITIES,
        payload: {
          funciones,
          eventos,
          eventosCampo,
          acciones,
        },
      });
    } catch (error) {
      console.error('Error ProcedimientoCustomProvider: ', error);
      dispatch({ type: ACTION_TYPES.SET_ERROR, payload: { error: error } });
    }
  };

  const setEventoSelected = ({ payload }: { payload: string }) => {
    dispatch({
      type: ACTION_TYPES.SET_EVENTO_SELECTED,
      payload,
    });
  };

  return (
    <ProcedimientoCustomContext.Provider value={{ mainDataGrid, state, dispatch, setEventoSelected }}>
      {children}
    </ProcedimientoCustomContext.Provider>
  );
};

export { ProcedimientoCustomContext, ProcedimientoCustomProvider };

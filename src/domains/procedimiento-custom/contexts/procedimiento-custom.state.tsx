import { DropdownSchemaType } from '@app/utils/zod.util';

export type ProcedimientoCustomState = {
  funciones: DropdownSchemaType;
  eventos: DropdownSchemaType;
  eventosCampo: DropdownSchemaType;
  acciones: DropdownSchemaType;
  eventoCodeSelected?: string;
  error: AnyValue;
};

export interface ActionParam {
  type: string;
  payload: AnyValue;
}

export const initialState: ProcedimientoCustomState = {
  funciones: [],
  eventos: [],
  eventosCampo: [],
  acciones: [],
  error: null,
};

export const ACTION_TYPES = {
  SET_ENTITIES: 'SET_ENTITIES',
  SET_EVENTO_SELECTED: 'SET_EVENTO_SELECTED',
  SET_ERROR: 'SET_ERROR',
};

export function reducer(state: ProcedimientoCustomState = initialState, action: { type: string; payload: AnyValue }) {
  switch (action.type) {
    case ACTION_TYPES.SET_ENTITIES:
      return {
        ...state,
        ...action.payload,
      };
    case ACTION_TYPES.SET_EVENTO_SELECTED:
      return {
        ...state,
        eventoCodeSelected: action.payload,
      };
    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

import { DropdownSchemaType } from '@app/utils/zod.util';

export type ProcedimientoCustomState = {
  funciones: DropdownSchemaType;
  eventos: DropdownSchemaType;
  eventosCampo: DropdownSchemaType;
  acciones: DropdownSchemaType;
  eventoCodeSelected?: string;
};

export interface ActionParam {
  type: string;
  payload: DropdownSchemaType;
}

export const initialState: ProcedimientoCustomState = {
  funciones: [],
  eventos: [],
  eventosCampo: [],
  acciones: [],
};

export const ACTION_TYPES = {
  SET_ENTITIES: 'SET_ENTITIES',
  SET_EVENTO_SELECTED: 'SET_EVENTO_SELECTED',
};

export function reducer(
  state: ProcedimientoCustomState = initialState,
  action: { type: string; payload: any },
) {
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
    default:
      return state;
  }
}

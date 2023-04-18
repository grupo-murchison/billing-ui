import { DropdownSchemaType } from '@app/utils/zod.util';

export type ProcedimientoCustomState = {
  funciones: DropdownSchemaType;
  eventos: DropdownSchemaType;
  eventosCampo: DropdownSchemaType;
  acciones: DropdownSchemaType;
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
};

export function reducer(
  state: ProcedimientoCustomState = initialState,
  action: { type: string; payload: any },
) {
  switch (action.type) {
    case ACTION_TYPES.SET_ENTITIES:
      return {
        ...action.payload
      };
    
    default:
      return state;
  }
}

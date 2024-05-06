import { DROPDOWN_ITEM_SCHEMA } from '@app/utils/zod.util';
import { z } from 'zod';

export const getAllEventoCampoAsDropdownSchema = DROPDOWN_ITEM_SCHEMA.extend({
  tipoDato: z.number(),
});

export type EventoCampoDropdownItemType = z.infer<typeof getAllEventoCampoAsDropdownSchema>;

export const DROPDOWN_SCHEMA = z.array(getAllEventoCampoAsDropdownSchema);

export type EventoCampoDropdownSchemaType = z.infer<typeof DROPDOWN_SCHEMA>;

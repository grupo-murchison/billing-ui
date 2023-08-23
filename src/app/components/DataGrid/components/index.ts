// TODO idea inicial, revisar si tiene sentido y pulir.
// Podria usarse con un "field type" o una prop "field custom" (como renderCellType: 'renderCellExpand' )
// y que se termine de resolver o llamar desde el DataGridWithContext

import { renderCellExpand } from './DescriptionTextCellExpand';

export const renderCellResolver = (type: string, params: AnyValue, config?: AnyValue) => {
  switch (type) {
    case 'renderCellExpand':
      return renderCellExpand(params);

    default:
      break;
  }
};

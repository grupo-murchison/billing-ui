import { GridLocaleText } from '@mui/x-data-grid';

// https://github.com/mui/mui-x/blob/HEAD/packages/grid/x-data-grid/src/constants/localeTextConstants.ts
export const localeText: Partial<GridLocaleText> = {
  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Mostrar columnas',
  columnMenuManageColumns: 'Administrar columnas',
  columnMenuFilter: 'Filtro',
  columnMenuHideColumn: 'Ocultar columna',
  columnMenuUnsort: 'Sin Ordenar',
  columnMenuSortAsc: 'Ordenar ASC',
  columnMenuSortDesc: 'Ordenar DESC',

  // Columns panel text
  columnsPanelTextFieldLabel: 'Buscar columna',
  columnsPanelTextFieldPlaceholder: 'Nombre columna',
  columnsPanelDragIconLabel: 'Reorder column',
  columnsPanelShowAllButton: 'Mostrar todas',
  columnsPanelHideAllButton: 'Ocultar todas',

  // Rows selected footer text
  footerRowSelected: count =>
    count !== 1 ? `${count.toLocaleString()} filas seleccionadas` : `${count.toLocaleString()} fila seleccionada`,

  // Root
  noRowsLabel: 'No se encontraron registros.',
  noResultsOverlayLabel: 'No se encontraron resultados.',

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,
};

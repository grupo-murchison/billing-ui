import { GridLocaleText } from '@mui/x-data-grid';

// https://github.com/mui/mui-x/blob/HEAD/packages/grid/x-data-grid/src/constants/localeTextConstants.ts
export const localeText: Partial<GridLocaleText> = {
  // Density selector toolbar button text
  // toolbarDensity: 'Densidad',
  // toolbarDensityLabel: 'Densidad',
  // toolbarDensityCompact: 'Compacto',
  // toolbarDensityStandard: 'Standard',
  // toolbarDensityComfortable: 'Confortable',

  // Columns selector toolbar button text
  // toolbarColumns: 'Columnas',
  // toolbarColumnsLabel: 'Seleccionar columnas',

  // Column menu text
  'columnMenuLabel': 'Menu',
  'columnMenuShowColumns': 'Mostrar columnas',
  'columnMenuManageColumns': 'Administrar columnas',
  'columnMenuFilter': 'Filtro',
  'columnMenuHideColumn': 'Ocultar columna',
  'columnMenuUnsort': 'Sin Ordenar',
  'columnMenuSortAsc': 'Ordenar ASC',
  'columnMenuSortDesc': 'Ordenar DESC',

  // Columns panel text
  'columnsPanelTextFieldLabel': 'Buscar columna',
  'columnsPanelTextFieldPlaceholder': 'Nombre columna',
  'columnsPanelDragIconLabel': 'Reordenar columna',
  'columnsPanelShowAllButton': 'Mostrar todas',
  'columnsPanelHideAllButton': 'Ocultar todas',

  // Filters toolbar button text
  'toolbarFilters': 'Filtrar',
  // toolbarFiltersLabel: 'Mostrar filtros',
  'toolbarFiltersTooltipHide': 'Ocultar filtros',
  'toolbarFiltersTooltipShow': 'Mostrar filtros',
  // toolbarFiltersTooltipActive: (count) =>
  //   count !== 1 ? `${count} active filters` : `${count} active filter`,

  // Quick filter toolbar field
  // toolbarQuickFilterPlaceholder: 'Buscar…',
  // toolbarQuickFilterLabel: 'Buscar',
  // toolbarQuickFilterDeleteIconLabel: 'Limpiar',

  // Export selector toolbar button text
  'toolbarExport': 'Exportar',
  'toolbarExportLabel': 'Exportar',
  'toolbarExportCSV': 'Descargar como CSV',
  'toolbarExportPrint': 'Imprimr',
  // toolbarExportExcel: 'Descargar como Excel',

  // Filter panel text
  // filterPanelAddFilter: 'Agregar filtro',
  // filterPanelRemoveAll: 'Borrar todo',
  // filterPanelDeleteIconLabel: 'Borrar',
  // filterPanelLogicOperator: 'Operador logico',
  'filterPanelOperator': 'Operador',
  // filterPanelOperatorAnd: 'Y',
  // filterPanelOperatorOr: 'O',
  'filterPanelColumns': 'Columnas',
  'filterPanelInputLabel': 'Valor',
  'filterPanelInputPlaceholder': 'Valor del filtro',

  // Filter operators text
  'filterOperatorContains': 'Contiene',
  'filterOperatorEquals': 'Es igual a...',
  'filterOperatorStartsWith': 'Comienza por...',
  'filterOperatorEndsWith': 'Termina con...',
  // filterOperatorIs: 'Es',
  // filterOperatorNot: 'No es',
  // filterOperatorAfter: 'Es despues',
  // filterOperatorOnOrAfter: 'es en o despues',
  // filterOperatorBefore: 'Es antes',
  // filterOperatorOnOrBefore: 'Es en o antes',
  'filterOperatorIsEmpty': 'Esta vacio',
  'filterOperatorIsNotEmpty': 'No esta vacio',
  'filterOperatorIsAnyOf': 'Es uno de',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',

  // Header filter operators text
  // headerFilterOperatorContains: 'Contiene',
  // headerFilterOperatorEquals: 'Es igual a...',
  // headerFilterOperatorStartsWith: 'Comienza por...',
  // headerFilterOperatorEndsWith: 'Termina con...',
  // headerFilterOperatorIs: 'Es',
  // headerFilterOperatorNot: 'No es',
  // headerFilterOperatorAfter: 'Es despues',
  // headerFilterOperatorOnOrAfter: 'Es en o despues',
  // headerFilterOperatorBefore: 'Es antes',
  // headerFilterOperatorOnOrBefore: 'Es en o despues',
  // headerFilterOperatorIsEmpty: 'Vacio',
  // headerFilterOperatorIsNotEmpty: 'No vacio',
  // headerFilterOperatorIsAnyOf: 'Es uno de',
  // 'headerFilterOperator=': 'Es igual a...',
  // 'headerFilterOperator!=': 'No es igual a...',
  // 'headerFilterOperator>': 'Mayor que',
  // 'headerFilterOperator>=': 'Mayor que o igual a',
  // 'headerFilterOperator<': 'Menor que',
  // 'headerFilterOperator<=': 'Menor que o igual a',

  // Filter values text
  // filterValueAny: 'cualquiera',
  // filterValueTrue: 'verdadero',
  // filterValueFalse: 'falso',

  // Column header text
  //  columnHeaderFiltersTooltipActive: (count) =>
  //   count !== 1 ? `${count} filtro activo` : `${count} filtro activo`,
  // columnHeaderFiltersLabel: 'Mostrar filtros',
  // columnHeaderSortIconLabel: 'Ordenar',

  // Rows selected footer text
  'footerRowSelected': count =>
    count !== 1 ? `${count.toLocaleString()} filas seleccionadas` : `${count.toLocaleString()} fila seleccionada`,

  // Total row amount footer text
  // 'footerTotalRows': 'Total de filas:',

  // Root
  'noRowsLabel': 'No se encontraron registros.',
  'noResultsOverlayLabel': 'No se encontraron resultados.',

  // Total visible row amount footer text
  'footerTotalVisibleRows': (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  // checkboxSelectionHeaderName: 'Seleccionar marcados',
  // checkboxSelectionSelectAllRows: 'Seleccionar todas las columnas',
  // checkboxSelectionUnselectAllRows: 'Deseleccionar todas las filas',
  // checkboxSelectionSelectRow: 'Selecionar fila',
  // checkboxSelectionUnselectRow: 'Deseleccionar fila',

  // Boolean cell text
  // booleanCellTrueLabel: 'si',
  // booleanCellFalseLabel: 'no',

  // Actions cell more text
  // 'actionsCellMore': 'mas',

  // Column pinning text
  // pinToLeft: 'Fijar a la izquierda',
  // pinToRight: 'Fijar a la derecha',
  // unpin: 'Desprender',

  // Tree Data
  // treeDataGroupingHeaderName: 'Agrupar',
  // treeDataExpand: 'Ver descendientes',
  // treeDataCollapse: 'Ocultar descendientes',

  // Grouping columns
  // 'groupingColumnHeaderName': 'Agrupar',
  // 'groupColumn': name => `Agrupar por ${name}`,
  // 'unGroupColumn': name => `Dejar de agrupar por ${name}`,

  // Master/detail
  // 'detailPanelToggle': 'Alternar panel de detalles',
  // 'expandDetailPanel': 'Expandir',
  // 'collapseDetailPanel': 'Colapsar',

  // Used core components translation keys
  // 'MuiTablePagination': {},

  // Row reordering text
  // 'rowReorderingHeaderName': 'Reordenar filas',

  // Aggregation
  // 'aggregationMenuItemHeader': 'Agregar',
  // 'aggregationFunctionLabelSum': 'suma',
  // 'aggregationFunctionLabelAvg': 'promeido',
  // 'aggregationFunctionLabelMin': 'minimo',
  // 'aggregationFunctionLabelMax': 'maximo',
  // 'aggregationFunctionLabelSize': 'tamaño',
};

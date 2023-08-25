import {
  GridApi,
  GridCsvExportMenuItem,
  GridCsvExportOptions,
  GridExportMenuItemProps,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExportContainer,
  GridToolbarFilterButton,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
} from '@mui/x-data-grid';

import { DateLib } from '@libs';
import { MenuItem } from '@mui/material';
import { exportBlob } from '@app/components/Button/Download';

const timestamp = DateLib.ISOStringToTimeStamp(new Date().toISOString());

const ToolbarMUI = ({ ...props }: GridCsvExportOptions) => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExportContainer>
        <GridCsvExportMenuItem
          options={{
            fileName: `${props.fileName || 'Download-Billing'}-${timestamp}`,
          }}
        />
        <JsonExportMenuItem options={{ fileName: props.fileName }} />
      </GridToolbarExportContainer>
    </GridToolbarContainer>
  );
};

function JsonExportMenuItem(props: GridExportMenuItemProps<AnyValue>) {
  const apiRef = useGridApiContext();

  const { hideMenu } = props;

  const getJson = (apiRef: React.MutableRefObject<GridApi>) => {
    // Select rows and columns
    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
    const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

    // Format the data. Here we only keep the value
    const data = filteredSortedRowIds.map(id => {
      const row: Record<string, any> = {};
      visibleColumnsField.forEach(field => {
        row[field] = apiRef.current.getCellParams(id, field).value;
      });
      return row;
    });

    // Stringify with some indentation
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#parameters
    return JSON.stringify(data, null, 2);
  };

  return (
    <MenuItem
      onClick={() => {
        const jsonString = getJson(apiRef);
        const blob = new Blob([jsonString], { type: 'text/json' });
        exportBlob(blob, `${props?.options?.fileName || 'Download-Billing'}-${timestamp}`, 'json');

        // Hide the export menu after the export
        hideMenu?.();
      }}
    >
      Descargar como JSON
    </MenuItem>
  );
}

export default ToolbarMUI;

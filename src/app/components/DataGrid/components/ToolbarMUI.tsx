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
import { Button, MenuItem, Stack, useTheme } from '@mui/material';
import { exportBlob } from '@app/components/Button/Download';
import { AddIcon } from '@assets/icons';

const timestamp = DateLib.ISOStringToTimeStamp(new Date().toISOString());

interface ToolbarMuiExportProps extends GridCsvExportOptions {
  onClickNew?: () => void;
}

const ToolbarMUI = ({ onClickNew, ...props }: ToolbarMuiExportProps) => {
  const theme = useTheme();
  return (
    <GridToolbarContainer
      sx={{
        justifyContent: 'flex-end',
        backgroundColor: '#d1d8df',
      }}
    >
      {/* <GridToolbarColumnsButton /> */}
      <GridToolbarFilterButton />
      {/* <GridToolbarDensitySelector /> */}
      <GridToolbarExportContainer>
        <GridCsvExportMenuItem
          options={{
            fileName: `${props.fileName || 'Download-Billing'}-${timestamp}`,
          }}
        />
        <JsonExportMenuItem options={{ fileName: props.fileName }} />
      </GridToolbarExportContainer>
      {onClickNew && (
        <Button
          onClick={onClickNew}
          color='primary'
          variant='text'
          sx={{ fontSize: '0.8125rem' }}
          startIcon={<AddIcon />}
        >
          Alta
        </Button>
      )}
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
      const row: Record<string, AnyValue> = {};
      visibleColumnsField.forEach(field => {
        row[field] = apiRef.current.getCellParams(id, field).value;
      });
      return row;
    });

    // Stringify with some indentation
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

import React from 'react';
import {
  GridApi,
  GridCsvExportMenuItem,
  GridCsvExportOptions,
  GridExportMenuItemProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  GridToolbarColumnsButton,
  GridToolbarContainer,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  GridToolbarDensitySelector,
  GridToolbarExportContainer,
  GridToolbarFilterButton,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
} from '@mui/x-data-grid';

import { DateLib } from '@libs';
import { Button, MenuItem } from '@mui/material';
import { exportBlob } from '@app/components/Button/Download';
import { AddIcon } from '@assets/icons';

const timestamp = DateLib.ISOStringToTimeStamp(new Date().toISOString());

interface ToolbarMuiExportProps extends GridCsvExportOptions {
  onClickNew?: () => void;
  subComponent?: React.JSXElementConstructor<AnyValue> | null;
}

const ToolbarBase = ({ onClickNew, subComponent: SubComponent, ...props }: ToolbarMuiExportProps) => {
  return (
    <GridToolbarContainer
      sx={{
        justifyContent: 'flex-end',
        backgroundColor: '#d1d8df',
      }}
    >
      {SubComponent && <SubComponent />}

      {/* <GridToolbarColumnsButton /> */}

      {<GridToolbarFilterButton />}

      {/* <GridToolbarDensitySelector /> */}

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

export default ToolbarBase;

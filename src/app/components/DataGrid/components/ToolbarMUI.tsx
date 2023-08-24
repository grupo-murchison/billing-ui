import {
  GridCsvExportOptions,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';

import { DateLib } from '@libs';

const ToolbarMUI = ({ ...props }: GridCsvExportOptions) => {
  return (
    <GridToolbarContainer>
      {/* <GridToolbarColumnsButton /> */}
      <GridToolbarFilterButton />
      {/* <GridToolbarDensitySelector /> */}
      <GridToolbarExport
        csvOptions={{
          fileName: `${props.fileName || 'Download-Billing'}-${DateLib.ISOStringToTimeStamp(new Date().toISOString())}`,
        }}
        printOptions={{
          disableToolbarButton: true,
        }}
      />
    </GridToolbarContainer>
  );
};

export default ToolbarMUI;

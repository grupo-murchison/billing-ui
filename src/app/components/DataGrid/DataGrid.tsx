import { DataGrid as MUIDataGrid, DataGridProps } from '@mui/x-data-grid';

const DataGrid = ({ rows, columns }: DataGridProps) => {
  // Repartir el espacio en partes iguales
  columns.forEach(col => {
    col['flex'] = col?.flex ? col.flex : 1;
  });

  return (
    <>
      <MUIDataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        autoHeight={true}
        sx={{
          '& .MuiDataGrid-row:hover': {
            background: '#CCCED0',
            // color: 'primary.main',
          },
        }}
      />
    </>
  );
};

export default DataGrid;

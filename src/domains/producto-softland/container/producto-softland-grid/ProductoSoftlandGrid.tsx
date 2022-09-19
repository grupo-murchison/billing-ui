import { DataGrid } from '@app/components';

import { withBreadcrumb } from '@app/hocs';

import { ProductoSoftlandRepository } from '@domains/producto-softland/repository';
import { ProductoSoflandGridBreadcrumb } from '@domains/producto-softland/constants';

const ProductoSoftlandGrid = () => {
  return (
    <>
      <DataGrid
        columnHeads={[
          { label: 'AGRUPACIÓN' },
          { label: 'CÓDIGO' },
          { label: 'DESCRIPCIÓN' },
          { label: 'ACTIVO' },
          { label: 'FECHA ACTIVO' },
          { label: '' },
        ]}
        repositoryFunc={ProductoSoftlandRepository.getAllProductoSoftlandPaginated}
        rowTemplate={row => (
          <>
            <DataGrid.TableCell>{row.agrupacion}</DataGrid.TableCell>
            <DataGrid.TableCell>{row.codigo}</DataGrid.TableCell>
            <DataGrid.TableCell>{row.descripcion}</DataGrid.TableCell>
            <DataGrid.TableCell>{row.activo ? 'SI' : 'NO'}</DataGrid.TableCell>
            <DataGrid.TableCell>{row.fechaCambioEstado}</DataGrid.TableCell>
            <DataGrid.TableCell>{'--'}</DataGrid.TableCell>
          </>
        )}
      />
    </>
  );
};

export default withBreadcrumb(ProductoSoftlandGrid, ProductoSoflandGridBreadcrumb);

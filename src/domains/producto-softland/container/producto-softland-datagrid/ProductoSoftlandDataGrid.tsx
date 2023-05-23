import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

import { Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/pro-components';

import { ProductoSoftlandRepository } from '@domains/producto-softland/repository';
import { ProductoSoftlandDataGridBreadcrumb } from '@domains/producto-softland/constants';
import { ProductoSoftlandContext } from '@domains/producto-softland/contexts';

import { DateLib } from '@libs';

const ProductoSoftlandDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProductoSoftlandContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/producto-softland/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/producto-softland/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (id: number) => {
      confirmDialog.open({
        title: '¿Eliminar Producto Softland?',
        message: 'Desea eliminar el registro?',
        async onClickYes() {
          await ProductoSoftlandRepository.deleteProductoSoftlandById(id);
          confirmDialog.close();
          mainDataGrid.reload();
        },
      });
    },
    [confirmDialog, mainDataGrid],
  );

  useEffect(() => {
    mainDataGrid.load();
  }, [mainDataGrid]);

  return (
    <>
      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
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
                <td>{row.agrupacion}</td>
                <td>{row.codigo}</td>
                <td>{row.descripcion}</td>
                <td>{row.activo ? 'SI' : 'NO'}</td>
                <td>{DateLib.beautifyDBString(row.fechaCambioEstado)}</td>
                <td align='center'>
                  <Stack direction='row' spacing={1}>
                    <DataGrid.EditButton onClick={() => handleClickEdit(row.id)} />
                    <DataGrid.DeleteButton onClick={() => handleClickDelete(row.id)} />
                  </Stack>
                </td>
              </>
            )}
            onClickNew={handleClickCreate}
          />
        </Col>
      </Row>
      <Outlet />
    </>
  );
};

export default withBreadcrumb(ProductoSoftlandDataGrid, ProductoSoftlandDataGridBreadcrumb);

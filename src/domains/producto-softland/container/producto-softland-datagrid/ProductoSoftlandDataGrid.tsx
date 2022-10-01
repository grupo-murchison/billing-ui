import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import { DataGrid, Portlet, Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DeleteOutlineIcon, EditOutlinedIcon } from '@assets/icons';

import { ProductoSoftlandRepository } from '@domains/producto-softland/repository';
import { ProductoSoflandDataGridBreadcrumb } from '@domains/producto-softland/constants';
import { ProductoSoftlandContext } from '@domains/producto-softland/contexts';

import { DateLib } from '@libs';

import { Button, IconButton } from '@mui/material';

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
    <Portlet>
      <Row>
        <Col md={12} textAlign='right'>
          <Button variant='outlined' onClick={handleClickCreate}>
            Nuevo Producto
          </Button>
        </Col>
      </Row>
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
                <DataGrid.TableCell>{row.agrupacion}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.codigo}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.descripcion}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.activo ? 'SI' : 'NO'}</DataGrid.TableCell>
                <DataGrid.TableCell>{DateLib.beautifyDBString(row.fechaCambioEstado)}</DataGrid.TableCell>
                <DataGrid.TableCell>
                  <IconButton color='primary' aria-label='Editar' onClick={() => handleClickEdit(row.id)}>
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton color='primary' aria-label='Eliminar' onClick={() => handleClickDelete(row.id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </DataGrid.TableCell>
              </>
            )}
          />
        </Col>
      </Row>
      <Outlet />
    </Portlet>
  );
};

export default withBreadcrumb(ProductoSoftlandDataGrid, ProductoSoflandDataGridBreadcrumb);

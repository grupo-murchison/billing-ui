import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import { DataGrid, Portlet, Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DeleteOutlineIcon, EditOutlinedIcon } from '@assets/icons';

import { ProcedimientoPRepository } from '@domains/procedimiento-p/repository';
import { ProcedimientoPDataGridBreadcrumb } from '@domains/procedimiento-p/constants';
import { ProcedimientoPContext } from '@domains/procedimiento-p/contexts';

import { Button, IconButton } from '@mui/material';

const ProcedimientoPDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoPContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/procedimiento-p/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-p/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (id: number) => {
      confirmDialog.open({
        message: 'Desea eliminar el registro?',
        async onClickYes() {
          await ProcedimientoPRepository.deleteProcedimientoPById(id);
          confirmDialog.close();
          mainDataGrid.reload();
        },
      });
    },
    [confirmDialog],
  );

  useEffect(() => {
    mainDataGrid.load();
  }, [mainDataGrid]);

  return (
    <Portlet>
      <Row>
        <Col md={12} textAlign='right'>
          <Button variant='outlined' onClick={handleClickCreate}>
            Nuevo Procedimiento P
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            columnHeads={[{ label: 'CÓDIGO' }, { label: 'DENOMINACIÓN' }, { label: 'MONEDA' }, { label: '' }]}
            repositoryFunc={ProcedimientoPRepository.getAllProcedimientoPPaginated}
            rowTemplate={row => (
              <>
                <DataGrid.TableCell>{row.codigo}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.denominacion}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.moneda}</DataGrid.TableCell>
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

export default withBreadcrumb(ProcedimientoPDataGrid, ProcedimientoPDataGridBreadcrumb);

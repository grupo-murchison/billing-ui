import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import { DataGrid, Portlet, Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DeleteOutlineIcon, EditOutlinedIcon } from '@assets/icons';

import { ProcedimientoQRepository } from '@domains/procedimiento-q/repository';
import { ProcedimientoQDataGridBreadcrumb } from '@domains/procedimiento-q/constants';
import { ProcedimientoQContext } from '@domains/procedimiento-q/contexts';

import { Button, IconButton } from '@mui/material';

const ProcedimientoQDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoQContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/procedimiento-q/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-q/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (id: number) => {
      confirmDialog.open({
        message: 'Desea eliminar el registro?',
        async onClickYes() {
          await ProcedimientoQRepository.deleteProcedimientoQById(id);
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
            Nuevo Procedimiento
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            columnHeads={[
              { label: 'CÓDIGO' },
              { label: 'DESCRIPCIÓN' },
              { label: 'DENOMINACIÓN' },
              { label: 'TIPO PROCEDIMIENTO' },
              { label: '' },
            ]}
            repositoryFunc={ProcedimientoQRepository.getAllProcedimientoQPaginated}
            rowTemplate={row => (
              <>
                <DataGrid.TableCell>{row.codigo}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.descripcion}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.denominacion}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.tipoProcedimiento}</DataGrid.TableCell>
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

export default withBreadcrumb(ProcedimientoQDataGrid, ProcedimientoQDataGridBreadcrumb);

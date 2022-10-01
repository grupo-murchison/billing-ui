import { useCallback, useContext, useEffect, useState } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import { DataGrid, Portlet, Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog, useDataGrid } from '@app/hooks';

import { DeleteOutlineIcon, EditOutlinedIcon } from '@assets/icons';

import { ProcedimientoPSRepository } from '@domains/procedimiento-ps/repository';
import { ProcedimientoPSDataGridBreadcrumb } from '@domains/procedimiento-ps/constants';
import { ProcedimientoPSContext } from '@domains/procedimiento-ps/contexts';

import { UuidLib } from '@libs';

import { Button, IconButton } from '@mui/material';

const ProcedimientoPSDataGrid = () => {
  const _navigate = useNavigate();

  const { tempRef } = useContext(ProcedimientoPSContext);

  const [__keyDataGrid, setKeyDataGrid] = useState<string>(UuidLib.newUuid());

  const confirmDialog = useConfirmDialog();
  const mainDataGrid = useDataGrid();

  const handleClickCreate = useCallback(() => {
    _navigate('/procedimiento-ps/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-ps/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (id: number) => {
      confirmDialog.open({
        message: 'Desea eliminar el registro?',
        async onClickYes() {
          await ProcedimientoPSRepository.deleteProcedimientoPSById(id);
          confirmDialog.close();
          setKeyDataGrid(UuidLib.newUuid());
        },
      });
    },
    [confirmDialog],
  );

  useEffect(() => {
    tempRef.current = {
      reloadTable() {
        setKeyDataGrid(UuidLib.newUuid());
      },
    };
  }, []);

  return (
    <Portlet>
      <Row>
        <Col md={12} textAlign='right'>
          <Button variant='outlined' onClick={handleClickCreate}>
            Nuevo Procedimiento PS
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            key={__keyDataGrid}
            columnHeads={[{ label: 'CÓDIGO' }, { label: 'DENOMINACIÓN' }, { label: '' }]}
            repositoryFunc={ProcedimientoPSRepository.getAllProcedimientoPSPaginated}
            rowTemplate={row => (
              <>
                <DataGrid.TableCell>{row.codigo}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.denominacion}</DataGrid.TableCell>
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

export default withBreadcrumb(ProcedimientoPSDataGrid, ProcedimientoPSDataGridBreadcrumb);

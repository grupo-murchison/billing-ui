import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, useParams, Outlet } from 'react-router-dom';

import { DataGrid, Col, Row } from '@app/components';

import { useConfirmDialog } from '@app/hooks';

import { DeleteOutlineIcon, EditOutlinedIcon } from '@assets/icons';

import { ProcedimientoQVariableContext } from '@domains/procedimiento-q-variable/contexts';
import { ProcedimientoQVariableRepository } from '@domains/procedimiento-q-variable/repository';

import { Button, IconButton } from '@mui/material';

const ProcedimientoQVariableDataGrid = () => {
  const _navigate = useNavigate();
  const { procedimientoQId } = useParams();

  const { mainDataGrid } = useContext(ProcedimientoQVariableContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate(`/procedimiento-q/${procedimientoQId}/edit/procedimiento-q-variable/create`);
  }, [_navigate, procedimientoQId]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-q/${procedimientoQId}/edit/procedimiento-q-variable/${id}/edit`);
    },
    [_navigate, procedimientoQId],
  );

  const handleClickDelete = useCallback(
    (id: number) => {
      confirmDialog.open({
        message: 'Desea eliminar el registro?',
        async onClickYes() {
          await ProcedimientoQVariableRepository.deleteProcedimientoQVariableById(id);
          confirmDialog.close();
          mainDataGrid.reload();
        },
      });
    },
    [confirmDialog, mainDataGrid],
  );

  useEffect(() => {
    mainDataGrid.load({
      fixedFilters: {
        idProcedimientoPS: procedimientoQId,
      },
    });
  }, [mainDataGrid, procedimientoQId]);

  return (
    <>
      <Row>
        <Col md={12} textAlign='right'>
          <Button variant='outlined' onClick={handleClickCreate}>
            Nueva Variable
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            columnHeads={[
              { label: 'CÓDIGO' },
              { label: 'NOMBRE' },
              { label: 'TIPO' },
              { label: 'DICCIONARIO' },
              { label: '' },
            ]}
            repositoryFunc={ProcedimientoQVariableRepository.getAllProcedimientoQVariablePaginated}
            rowTemplate={row => (
              <>
                <DataGrid.TableCell>{row.codigo}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.nombre}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.tipo}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.diccionario}</DataGrid.TableCell>
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
    </>
  );
};

export default ProcedimientoQVariableDataGrid;

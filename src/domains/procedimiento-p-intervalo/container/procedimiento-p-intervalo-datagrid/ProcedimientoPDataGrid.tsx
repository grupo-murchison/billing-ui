import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, useParams, Outlet } from 'react-router-dom';

import { DataGrid, Col, Row } from '@app/components';

import { useConfirmDialog } from '@app/hooks';

import { DeleteOutlineIcon, EditOutlinedIcon } from '@assets/icons';

import { ProcedimientoPIntervaloContext } from '@domains/procedimiento-p-intervalo/contexts';
import { ProcedimientoPIntervaloRepository } from '@domains/procedimiento-p-intervalo/repository';

import { Button, IconButton } from '@mui/material';

const ProcedimientoPIntervaloDataGrid = () => {
  const _navigate = useNavigate();
  const { procedimientoPId } = useParams();

  const { mainDataGrid } = useContext(ProcedimientoPIntervaloContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate(`/procedimiento-p/${procedimientoPId}/edit/procedimiento-p-intervalo/create`);
  }, [_navigate, procedimientoPId]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-p/${procedimientoPId}/edit/procedimiento-p-intervalo/${id}/edit`);
    },
    [_navigate, procedimientoPId],
  );

  const handleClickDelete = useCallback(
    (id: number) => {
      confirmDialog.open({
        message: 'Desea eliminar el registro?',
        async onClickYes() {
          await ProcedimientoPIntervaloRepository.deleteProcedimientoPIntervaloById(id);
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
        idProcedimientoP: procedimientoPId,
      },
    });
  }, [mainDataGrid, procedimientoPId]);

  return (
    <>
      <Row>
        <Col md={12} textAlign='right'>
          <Button variant='outlined' onClick={handleClickCreate}>
            Nuevo Intervalo
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            columnHeads={[
              { label: 'INTERVALO' },
              { label: 'VALOR INICIAL' },
              { label: 'VALOR FINAL' },
              { label: 'PRECIO' },
              { label: '' },
            ]}
            repositoryFunc={ProcedimientoPIntervaloRepository.getAllProcedimientoPIntervaloPaginated}
            rowTemplate={row => (
              <>
                <DataGrid.TableCell>{row.intervalo}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.valorInicial}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.valorFinal}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.precio}</DataGrid.TableCell>
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

export default ProcedimientoPIntervaloDataGrid;

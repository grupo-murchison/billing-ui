import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, useParams, Outlet } from 'react-router-dom';

import { DataGrid, Col, Row } from '@app/components';

import { useConfirmDialog } from '@app/hooks';

import { DeleteOutlineIcon, EditOutlinedIcon } from '@assets/icons';

import { ConceptoAcuerdoContext } from '@domains/concepto-acuerdo/contexts';
import { ConceptoAcuerdoRepository } from '@domains/concepto-acuerdo/repository';

import { Button, IconButton } from '@mui/material';

const ConceptoAcuerdoDataGrid = () => {
  const _navigate = useNavigate();
  const { modeloAcuerdoId } = useParams();

  const { mainDataGrid } = useContext(ConceptoAcuerdoContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate(`/modelo-acuerdo/${modeloAcuerdoId}/edit/concepto-acuerdo/create`);
  }, [_navigate, modeloAcuerdoId]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/modelo-acuerdo/${modeloAcuerdoId}/edit/concepto-acuerdo/${id}/edit`);
    },
    [_navigate, modeloAcuerdoId],
  );

  const handleClickDelete = useCallback(
    (id: number) => {
      confirmDialog.open({
        message: 'Desea eliminar el registro?',
        async onClickYes() {
          await ConceptoAcuerdoRepository.deleteConceptoAcuerdoById(id);
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
        idProcedimientoPS: modeloAcuerdoId,
      },
    });
  }, [mainDataGrid, modeloAcuerdoId]);

  return (
    <>
      <Row>
        <Col md={12} textAlign='right'>
          <Button variant='outlined' onClick={handleClickCreate}>
            Nuevo Concepto
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            columnHeads={[
              { label: 'DESCRIPCIÓN' },
              { label: 'TIPO SERVICIO' },
              { label: 'PROC Q' },
              { label: 'PROC P' },
              { label: 'PROC PS' },
              { label: '' },
            ]}
            repositoryFunc={ConceptoAcuerdoRepository.getAllConceptoAcuerdoPaginated}
            rowTemplate={row => (
              <>
                <DataGrid.TableCell>{row.descripcion}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.tipoServicio}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.procedimientoQ}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.procedimientoP}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.procedimientoProductoSoftland}</DataGrid.TableCell>
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

export default ConceptoAcuerdoDataGrid;

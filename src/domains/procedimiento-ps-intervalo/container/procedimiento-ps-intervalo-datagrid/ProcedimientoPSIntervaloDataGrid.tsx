import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

import { Col, Row } from '@app/components';

import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/pro-components';

import { ProcedimientoPSIntervaloContext } from '@domains/procedimiento-ps-intervalo/contexts';
import { ProcedimientoPSIntervaloRepository } from '@domains/procedimiento-ps-intervalo/repository';

const ProcedimientoPSIntervaloDataGrid = () => {
  const _navigate = useNavigate();
  const { procedimientoPSId } = useParams();

  const { mainDataGrid } = useContext(ProcedimientoPSIntervaloContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate(`/procedimiento-ps/${procedimientoPSId}/procedimiento-ps-intervalo/create`);
  }, [_navigate, procedimientoPSId]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-ps/${procedimientoPSId}/procedimiento-ps-intervalo/${id}/edit`);
    },
    [_navigate, procedimientoPSId],
  );

  const handleClickDelete = useCallback(
    (id: number) => {
      confirmDialog.open({
        title: '¿Eliminar Procedimiento Producto Softland Intervalo?',
        message: 'Desea eliminar el registro?',
        async onClickYes() {
          await ProcedimientoPSIntervaloRepository.deleteProcedimientoPSIntervaloById(id);
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
        idProcedimientoPS: procedimientoPSId,
      },
    });
  }, [mainDataGrid, procedimientoPSId]);

  return (
    <>
      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            columnHeads={[
              { label: 'PRODUCTO SOFTLAND' },
              { label: 'INTERVALO' },
              { label: 'VALOR INICIAL' },
              { label: 'VALOR FINAL' },
              { label: '' },
            ]}
            repositoryFunc={ProcedimientoPSIntervaloRepository.getAllProcedimientoPSIntervaloPaginated}
            rowTemplate={row => (
              <>
                <td>{row.productoSoftland}</td>
                <td>{row.intervalo}</td>
                <td>{row.valorInicial}</td>
                <td>{row.valorFinal}</td>
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

export default ProcedimientoPSIntervaloDataGrid;

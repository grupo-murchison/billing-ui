import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

import { Col, Row } from '@app/components';

import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/pro-components';

import { ProcedimientoPSIntervaloContext } from '@domains/procedimiento-ps-intervalo/contexts';
import { ProcedimientoPSIntervaloRepository } from '@domains/procedimiento-ps-intervalo/repository';
import { label } from '@domains/procedimiento-ps-intervalo/contexts/constans';

const ProcedimientoPSIntervaloDataGrid = (codigo: any) => {
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

  //TODO: Obenter codigo.codigo.codigo con useContext
  const handleClickDelete = useCallback(
    (id: number) => {
      confirmDialog.open({
        entity: `${label.label}`,
        identifier: `${codigo.codigo.codigo}`,
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
              { headerName: 'PRODUCTO SOFTLAND' },
              { headerName: 'INTERVALO' },
              { headerName: 'VALOR INICIAL' },
              { headerName: 'VALOR FINAL' },
              { headerName: 'ACCIONES' },
            ]}
            repositoryFunc={ProcedimientoPSIntervaloRepository.getAllProcedimientoPSIntervaloPaginated}
            rowTemplate={row => (
              <>
                <td>{row.productoSoftland}</td>
                <td>{row.intervalo}</td>
                <td>{row.valorInicial}</td>
                <td>{row.valorFinal}</td>
                <td align='center'>
                  <Stack direction='row' justifyContent='center' spacing={1}>
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

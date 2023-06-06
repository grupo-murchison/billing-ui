import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

import { Col, Row } from '@app/components';

import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/pro-components';

import { ProcedimientoPIntervaloContext } from '@domains/procedimiento-p-intervalo/contexts';
import { ProcedimientoPIntervaloRepository } from '@domains/procedimiento-p-intervalo/repository';
import { label } from '@domains/procedimiento-p-intervalo/contexts/constants';

const ProcedimientoPIntervaloDataGrid = (codigo: any) => {
  const _navigate = useNavigate();
  const { procedimientoPId } = useParams();

  const { mainDataGrid } = useContext(ProcedimientoPIntervaloContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate(`/procedimiento-p/${procedimientoPId}/procedimiento-p-intervalo/create`);
  }, [_navigate, procedimientoPId]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-p/${procedimientoPId}/procedimiento-p-intervalo/${id}/edit`);
    },
    [_navigate, procedimientoPId],
  );

  //TODO: remplazar codigo.codigo.codigo por useContext
  const handleClickDelete = useCallback(
    (row: any) => {
      confirmDialog.open({
        entity: `${label.label}`,
        identifier: `${codigo.codigo.codigo}`,
        async onClickYes() {
          await ProcedimientoPIntervaloRepository.deleteProcedimientoPIntervaloById(row.id);
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
                <td>{row.intervalo}</td>
                <td>{row.valorInicial}</td>
                <td>{row.valorFinal}</td>
                <td>{row.precio}</td>
                <td align='center'>
                  <Stack direction='row' justifyContent='center' spacing={1}>
                    <DataGrid.EditButton onClick={() => handleClickEdit(row.id)} />
                    <DataGrid.DeleteButton onClick={() => handleClickDelete(row)} />
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

export default ProcedimientoPIntervaloDataGrid;

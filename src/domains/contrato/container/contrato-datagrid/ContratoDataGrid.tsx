import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

import { Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/pro-components';

import { ContratoRepository } from '@domains/contrato/repository';
import { ContratoContext } from '@domains/contrato/contexts';
import { ContratoDataGridBreadcrumb } from '@domains/contrato/constants';
import { ContratoRowDataGridSchema } from '@domains/contrato/repository/contrato.schemas';

import { DateLib } from '@libs';

const ContratoDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ContratoContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/contrato/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (row: ContratoRowDataGridSchema) => {
      _navigate(`/contrato/${row.id}/edit`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (row: ContratoRowDataGridSchema) => {
      confirmDialog.open({
        title: '¿Eliminar Contrato?',
        message: `Se eliminará el Contrato Nº ${row.nroContrato}?`,
        async onClickYes() {
          await ContratoRepository.deleteContratoById(row.id);
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
    <>
      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            columnHeads={[
              { label: 'Nº Contrato' },
              { label: 'Descripción' },
              { label: 'Tipo Contrato' },
              { label: 'Modelo Acuerdo' },
              { label: 'Cliente' },
              { label: 'Fecha Inicio' },
              { label: 'Fecha Fin' },
              { label: '' },
            ]}
            onClickNew={handleClickCreate}
            repositoryFunc={ContratoRepository.getAllContratoPaginated}
            rowTemplate={row => (
              <>
                {/* // TODO acá iria una funcion con row.map() que aplique rowSanitizer() a cada column y deberia recibir además un archivo de configuracion para ordenar las columnas*/}
                <td>{rowSanitizer(row.nroContrato)}</td>
                <td>{rowSanitizer(row.descripcion)}</td>
                <td>{rowSanitizer(row.tipoContrato)}</td>
                <td>{rowSanitizer(row.modeloAcuerdo)}</td>
                <td>{rowSanitizer(row.cliente)}</td>
                <td>{rowSanitizer(row.fechaInicioContrato && DateLib.beautifyDBString(row.fechaInicioContrato))}</td>
                <td>{rowSanitizer(row.fechaFinContrato && DateLib.beautifyDBString(row.fechaFinContrato))}</td>

                <td align='center'>
                  <Stack direction='row' spacing={1}>
                    <DataGrid.EditButton onClick={() => handleClickEdit(row)} />
                    <DataGrid.DeleteButton onClick={() => handleClickDelete(row)} />
                  </Stack>
                </td>
              </>
            )}
          />
        </Col>
      </Row>
      <Outlet />
    </>
  );
};

export default withBreadcrumb(ContratoDataGrid, ContratoDataGridBreadcrumb);

type TFn = (value: any) => any;
type TTowSanitizer = string | number | boolean | null | undefined | TFn;

//* idea prototipo, se puede mejorar
const rowSanitizer = (value: TTowSanitizer): string | any => {
  return value === null || value === undefined ? ' ' : value;
};

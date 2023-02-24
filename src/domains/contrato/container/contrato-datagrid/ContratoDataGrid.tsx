import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import { Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/pro-components';

import { ContratoRepository } from '@domains/contrato/repository';
import { ContratoDataGridBreadcrumb } from '@domains/contrato/constants';
import { ContratoContext } from '@domains/contrato/contexts';

import { DateLib } from '@libs';
import { type } from 'os';

const ContratoDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ContratoContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/contrato/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/contrato/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (id: number) => {
      confirmDialog.open({
        message: 'Desea eliminar el registro?',
        async onClickYes() {
          await ContratoRepository.deleteContratoById(id);
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
                <td>{rowSanitizer(row.fechaFinContrato && DateLib.beautifyDBString(row.fechaFinContrato))}</td>
                <td>{row.fechaInicioContrato ? DateLib.beautifyDBString(row.fechaInicioContrato) : ' '}</td>

                <td align='center'>
                  <DataGrid.EditButton onClick={() => handleClickEdit(row.id)} />
                </td>
                <td align='center'>
                  <DataGrid.DeleteButton onClick={() => handleClickDelete(row.id)} />
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

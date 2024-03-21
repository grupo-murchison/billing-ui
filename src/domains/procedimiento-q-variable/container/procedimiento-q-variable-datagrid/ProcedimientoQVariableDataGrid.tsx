import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

import { Col, Row } from '@app/components';

import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/components/DataGrid';

import { ProcedimientoQVariableContext } from '@domains/procedimiento-q-variable/contexts';
import { ProcedimientoQVariableRepository } from '@domains/procedimiento-q-variable/repository';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { DeleteOutlineIcon, EditOutlinedIcon } from '@assets/icons';

const ProcedimientoQVariableDataGrid = () => {
  const _navigate = useNavigate();
  const { procedimientoQId } = useParams();

  const { mainDataGrid } = useContext(ProcedimientoQVariableContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate(`/procedimiento-q/${procedimientoQId}/procedimiento-q-variable/create`);
  }, [_navigate, procedimientoQId]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-q/${procedimientoQId}/procedimiento-q-variable/${id}/edit`);
    },
    [_navigate, procedimientoQId],
  );

  const handleClickDelete = useCallback(
    (row: AnyValue) => {
      confirmDialog.open({
        entity: `Procedimiento Cantidad Cantidad Variable`,
        identifier: `${row.codigo}`,
        type: 'delete',
        async onClickYes() {
          await ProcedimientoQVariableRepository.deleteProcedimientoQVariableById(row.id);
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
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            columns={[
              { field: 'codigo', headerName: 'Código' },
              { field: 'nombre', headerName: 'Nombre' },
              { field: 'tipo', headerName: 'Tipo' },
              { field: 'diccionario', headerName: 'Diccionario' },
              {
                field: 'acciones',
                type: 'actions',
                headerName: 'Acciones',
                headerAlign: 'center',
                align: 'center',
                flex: 0.5,
                getActions: params => [
                  <GridActionsCellItem
                    key={2}
                    icon={<EditOutlinedIcon />}
                    label='Editar'
                    onClick={() => handleClickEdit(params.row.id)}
                    // showInMenu
                  />,
                  <GridActionsCellItem
                    key={3}
                    icon={<DeleteOutlineIcon />}
                    label='Eliminar'
                    onClick={() => handleClickDelete(params.row)}
                    // showInMenu
                  />,
                ],
              },
            ]}
            repositoryFunc={ProcedimientoQVariableRepository.getAllProcedimientoQVariablePaginated}
            onClickNew={handleClickCreate}
          />
        </Col>
      </Row>
      <Outlet />
    </>
  );
};

export default ProcedimientoQVariableDataGrid;

import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, useParams, Outlet } from 'react-router-dom';

import { Col, Row } from '@app/components';

import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/components/DataGrid';

import { ProcedimientoPSIntervaloContext } from '@domains/procedimiento-ps-intervalo/contexts';
import { ProcedimientoPSIntervaloRepository } from '@domains/procedimiento-ps-intervalo/repository';
import { label } from '@domains/procedimiento-ps-intervalo/contexts/constans';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { DeleteOutlineIcon, EditOutlinedIcon } from '@assets/icons';
import { Box, FormLabel, Typography } from '@mui/material';

const ProcedimientoPSIntervaloDataGrid = (codigo?: AnyValue) => {
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
    (row: AnyValue) => {
      confirmDialog.open({
        entity: 'Intervalo Procedimiento Producto Softland',
        identifier: `${row.intervalo}`,
        type: 'delete',
        async onClickYes() {
          await ProcedimientoPSIntervaloRepository.deleteProcedimientoPSIntervaloById(row.id);
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
      <Box mt={4} mb={3}>
        <FormLabel component='legend'>
          <Typography variant='h6' component='div'>
            Intervalos Procedimiento Prroducto Softland
          </Typography>
        </FormLabel>
      </Box>

      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            columns={[
              { field: 'productoSoftland', headerName: 'Producto Softland' },
              { field: 'intervalo', headerName: 'Intervalo' },
              { field: 'valorInicial', headerName: 'Valor Inicial' },
              { field: 'valorFinal', headerName: 'Valor Final' },
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
            repositoryFunc={ProcedimientoPSIntervaloRepository.getAllProcedimientoPSIntervaloPaginated}
            onClickNew={handleClickCreate}
          />
        </Col>
      </Row>
      <Outlet />
    </>
  );
};

export default ProcedimientoPSIntervaloDataGrid;

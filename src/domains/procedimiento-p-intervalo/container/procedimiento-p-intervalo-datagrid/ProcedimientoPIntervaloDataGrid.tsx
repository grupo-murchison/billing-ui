import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, useParams, Outlet } from 'react-router-dom';

import { Col, Row } from '@app/components';

import { useConfirmDialog } from '@app/hooks';

import { DataGrid } from '@app/components/DataGrid';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { ProcedimientoPIntervaloContext } from '@domains/procedimiento-p-intervalo/contexts';
import { ProcedimientoPIntervaloRepository } from '@domains/procedimiento-p-intervalo/repository';
import { EditOutlinedIcon, DeleteOutlineIcon } from '@assets/icons';
import { Box, FormLabel, Typography } from '@mui/material';
import { currencyFormatter } from '@libs/number';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProcedimientoPIntervaloDataGrid = (codigo?: AnyValue) => {
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

  const handleClickDelete = useCallback(
    (row: AnyValue) => {
      confirmDialog.open({
        entity: `Intervalo Procedimiento Precio`,
        identifier: `${row.intervalo}`,
        type: 'delete',
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
      <Box mt={4} mb={3}>
        <FormLabel component='legend'>
          <Typography variant='h6' component='div'>
            Intervalos Procedimiento Precio
          </Typography>
        </FormLabel>
      </Box>

      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            columns={[
              { field: 'intervalo', headerName: 'Intervalo' },
              { field: 'valorInicial', headerName: 'Valor Inicial' },
              { field: 'valorFinal', headerName: 'Valor Final' },
              {
                field: 'precio',
                headerName: 'Precio',
                valueFormatter: ({ value }) => currencyFormatter().format(value),
                align: 'right',
              },
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
            repositoryFunc={ProcedimientoPIntervaloRepository.getAllProcedimientoPIntervaloPaginated}
            onClickNew={handleClickCreate}
          />
        </Col>
      </Row>
      <Outlet />
    </>
  );
};

export default ProcedimientoPIntervaloDataGrid;

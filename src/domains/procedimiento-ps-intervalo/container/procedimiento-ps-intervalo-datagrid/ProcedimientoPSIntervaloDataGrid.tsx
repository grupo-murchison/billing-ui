import { useCallback, useContext, useEffect } from 'react';

import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { Box, FormLabel, Typography } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { Col, Row } from '@app/components';

import { useConfirmDialog, useLocationMode } from '@app/hooks';

import { DataGrid } from '@app/components/DataGrid';

import { ProcedimientoPSIntervaloContext } from '@domains/procedimiento-ps-intervalo/contexts';
import { ProcedimientoPSIntervaloRepository } from '@domains/procedimiento-ps-intervalo/repository';
import { DeleteOutlineIcon, EditOutlinedIcon, ViewIcon } from '@assets/icons';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProcedimientoPSIntervaloDataGrid = () => {
  const _navigate = useNavigate();
  const { procedimientoPSId } = useParams();
  const { canEdit } = useLocationMode();

  const { mainDataGrid } = useContext(ProcedimientoPSIntervaloContext);

  const confirmDialog = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate(`/procedimiento-ps/${procedimientoPSId}/edit/procedimiento-ps-intervalo/create`);
  }, [_navigate, procedimientoPSId]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-ps/${procedimientoPSId}/edit/procedimiento-ps-intervalo/${id}/edit`);
    },
    [_navigate, procedimientoPSId],
  );

  const handleClickView = useCallback(
    (id: number) => {
      if (canEdit) {
        _navigate(`/procedimiento-ps/${procedimientoPSId}/edit/procedimiento-ps-intervalo/${id}`);
      } else {
        _navigate(`/procedimiento-ps/${procedimientoPSId}/procedimiento-ps-intervalo/${id}`);
      }
    },
    [_navigate],
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
            Intervalos Procedimiento Producto Softland
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
                getActions: params => {
                  return [
                    <>
                      <GridActionsCellItem
                        key={1}
                        icon={<ViewIcon />}
                        label='Vista'
                        onClick={() => handleClickView(params.row.id)}
                      />
                      {canEdit && (
                        <>
                          <GridActionsCellItem
                            key={2}
                            icon={<EditOutlinedIcon />}
                            label='Editar'
                            onClick={() => handleClickEdit(params.row.id)}
                          />
                          <GridActionsCellItem
                            key={3}
                            icon={<DeleteOutlineIcon />}
                            label='Eliminar'
                            onClick={() => handleClickDelete(params.row)}
                          />
                        </>
                      )}
                    </>,
                  ];
                },
              },
            ]}
            repositoryFunc={ProcedimientoPSIntervaloRepository.getAllProcedimientoPSIntervaloPaginated}
            onClickNew={canEdit ? handleClickCreate : undefined}
          />
        </Col>
      </Row>
      <Outlet />
    </>
  );
};

export default ProcedimientoPSIntervaloDataGrid;

import { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { DataGrid, Col, Row } from '@app/components';

import { useConfirmDialog } from '@app/hooks';

import { DeleteOutlineIcon, EditOutlinedIcon } from '@assets/icons';

import { ProcedimientoPSIntervaloRepository } from '@domains/procedimiento-ps-intervalo/repository';

import { UuidLib } from '@libs';

import { Button, IconButton } from '@mui/material';

const ProcedimientoPSDataGrid = () => {
  const _navigate = useNavigate();

  const [__keyDataGrid, setKeyDataGrid] = useState<string>(UuidLib.newUuid());

  const { dialog, openDialog, closeDialog } = useConfirmDialog();

  const handleClickCreate = useCallback(() => {
    _navigate('/procedimiento-ps-intervalo/create');
  }, [_navigate]);

  const handleClickEdit = useCallback(
    (id: number) => {
      _navigate(`/procedimiento-ps-intervalo/${id}/edit`);
    },
    [_navigate],
  );

  const handleClickDelete = useCallback(
    (id: number) => {
      openDialog({
        message: 'Desea eliminar el registro?',
        async onClickYes() {
          await ProcedimientoPSIntervaloRepository.deleteProcedimientoPSIntervaloById(id);
          closeDialog();
          setKeyDataGrid(UuidLib.newUuid());
        },
      });
    },
    [openDialog, closeDialog],
  );

  return (
    <>
      <Row>
        <Col md={12} textAlign='right'>
          <Button variant='outlined' onClick={handleClickCreate}>
            Nuevo Intervalo
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <DataGrid
            key={__keyDataGrid}
            columnHeads={[{ label: 'INTERVALO' }, { label: 'VALOR INICIAL' }, { label: 'VALOR FINAL' }, { label: '' }]}
            repositoryFunc={ProcedimientoPSIntervaloRepository.getAllProcedimientoPSIntervaloPaginated}
            rowTemplate={row => (
              <>
                <DataGrid.TableCell>{row.intervalo}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.valorInicial}</DataGrid.TableCell>
                <DataGrid.TableCell>{row.valorFinal}</DataGrid.TableCell>
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
      {dialog}
    </>
  );
};

export default ProcedimientoPSDataGrid;

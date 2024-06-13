import { useCallback, useContext, useEffect, useState } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import { withBreadcrumb } from '@app/hocs';
import { useConfirmDialog } from '@app/hooks';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { ContratoRepository } from '@domains/contrato/repository';
import { ContratoContext } from '@domains/contrato/contexts';
import { ContratoDataGridBreadcrumb } from '@domains/contrato/constants';
import { ContratoRowDataGridSchema } from '@domains/contrato/repository/contrato.schemas';
import { ContartoLabelAndPath } from '@domains/contrato/constants';

import { DateLib } from '@libs';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { DeleteOutlineIcon, EditOutlinedIcon } from '@assets/icons';
import { ToastDeprecated as Toast } from '@app/components/Toast/Toast';

const ContratoDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ContratoContext);
  const [openToast, setOpenToast] = useState(false);
  const [errorFromBackEnd, setErrorFromBackEnd] = useState(false);
  const [toastMessage, setToastMessage] = useState('Datos enviados');

  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

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
        entity: `${ContartoLabelAndPath.label}`,
        identifier: `${row.nroContrato}`,
        type: 'delete',
        async onClickYes() {
          await ContratoRepository.deleteContratoById(row.id)
            .then(response => {
              if (response.status === 200) {
                setToastMessage('Contrato eliminado correctamente.');
              }
            })
            .catch(error => {
              setErrorFromBackEnd(true)
              setToastMessage(error.message || 'Ocurrió un error inesperado.');
            })
            .finally(() => {
              setErrorFromBackEnd(false)
              setOpenToast(true);
              confirmDialog.close();
              mainDataGrid.reload();
            });
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
      <DataGrid
        autoHeight={false}
        onClickNew={handleClickCreate}
        hookRef={mainDataGrid.ref}
        columns={[
          { field: 'nroContrato', headerName: 'Nº Contrato' },
          { field: 'descripcion', headerName: 'Descripción' },
          { field: 'tipoContrato', headerName: 'Tipo Contrato' },
          { field: 'modeloAcuerdo', headerName: 'Modelo Acuerdo' },
          { field: 'cliente', headerName: 'Cliente' },
          {
            field: 'fechaInicioContrato',
            headerName: 'Fecha Inicio',
            valueGetter: params => DateLib.beautifyDBString(params.value),
          },
          {
            field: 'fechaFinContrato',
            headerName: 'Fecha Fin',
            valueGetter: params => DateLib.beautifyDBString(params.value),
          },
          {
            field: 'actions',
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
                onClick={() => handleClickEdit(params.row)}
                showInMenu
              />,
              <GridActionsCellItem
                key={3}
                icon={<DeleteOutlineIcon />}
                label='Eliminar'
                onClick={() => handleClickDelete(params.row)}
                showInMenu
              />,
            ],
          },
        ]}
        repositoryFunc={ContratoRepository.getAllContratoPaginated}
      />

      <Outlet />
      <Toast open={openToast} message={toastMessage} error={errorFromBackEnd} onClose={handleCloseToast} />
    </>
  );
};

export default withBreadcrumb(ContratoDataGrid, ContratoDataGridBreadcrumb);

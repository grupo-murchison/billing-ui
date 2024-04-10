import DragDropFileUpload from '@app/components/FileUpload/DragDropFileUpload';
import { withBreadcrumb } from '@app/hocs';
import EventoCargaRepository from '@domains/evento-carga/repository/evento-carga.repository';
import { useState } from 'react';
import { EventoCargaBreadcrumb } from '../constants';
import { useConfirmDialog } from '@app/hooks';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { FiberManualRecordIcon } from '@assets/icons';

function EventoCarga() {
  const [loadingFile, setLoadingFile] = useState(false);

  const confirmDialog = useConfirmDialog();

  const condicionesEventoCarga = [
    `El archivo debe ser tipo excel en formato .xlsx.`,
    `Los eventos deben estar cargados en una hoja/solapa llamada "eventos" en minúsculas.`,
  ];

  const onFileUpload = async (file: FileList) => {
    setLoadingFile(true);
    await EventoCargaRepository.uploadFile(file[0])
      .then(() => {
        confirmDialog.open({
          type: 'ok',
          title: 'Archivo Enviado Correctamente',
          message: 'El archivo fue subido al servidor.',
          onClickYes() {
            confirmDialog.close();
          },
        });
      })
      .catch(err => {
        const error = JSON.parse(err.message);

        if (error && error.statusCode === 400) {
          confirmDialog.open({
            type: 'reject',
            title: 'No es posible cargar este archivo',
            message: error?.message,
            onClickYes() {
              confirmDialog.close();
            },
          });
        } else {
          confirmDialog.open({
            type: 'reject',
            title: 'No fue posible cargar el archivo',
            message: error?.message || error || 'Error Desconocido',
            onClickYes() {
              confirmDialog.close();
            },
          });
        }
      })
      .finally(() => {
        setLoadingFile(false);
      });
  };

  return (
    <>
      <Box my={3}>
        <List>
          {condicionesEventoCarga.map((condicion, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <FiberManualRecordIcon fontSize='inherit' />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant='h4' component='div'>
                    {condicion}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <DragDropFileUpload
        name='eventos-carga'
        onFileUpload={onFileUpload}
        accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // solo archivos .xlsx
        loading={loadingFile}
        disabled={loadingFile}
      />
    </>
  );
}

export default withBreadcrumb(EventoCarga, EventoCargaBreadcrumb);

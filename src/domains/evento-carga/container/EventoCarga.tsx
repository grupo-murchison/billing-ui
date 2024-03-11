import DragDropFileUpload from '@app/components/FileUpload/DragDropFileUpload';
import { withBreadcrumb } from '@app/hocs';
import EventoCargaRepository from '@domains/evento-carga/repository/evento-carga.repository';
import { useState } from 'react';
import { EventoCargaBreadcrumb } from '../constants';
import { useConfirmDialog } from '@app/hooks';

function EventoCarga() {
  const [loadingFile, setLoadingFile] = useState(false);

  const confirmDialog = useConfirmDialog();

  const onFileUpload = async (file: FileList) => {
    setLoadingFile(true);
    await EventoCargaRepository.uploadFile(file[0])
      .then(x => {
        console.log('Archivo enviado correctamente.');
        console.log('THEN', x);
        confirmDialog.open({
          type: 'ok',
          title: 'Archivo Enviado Correctamente',
          message: 'El archivo ya se encuentra cargado',
          onClickYes() {
            confirmDialog.close();
          },
        });
      })
      .catch(err => {
        // TODO Puede devolver status code 400. Capturar y mostrar el mensaje en dialogo de notificacion.
        const error = JSON.parse(err.message);

        if (error && error.statusCode === 400) {
          confirmDialog.open({
            type: 'reject',
            title: 'No es posible cargar este archivo',
            message: error.message,
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
      <DragDropFileUpload
        name='eventos-carga'
        onFileUpload={onFileUpload}
        accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // solo archivos .xlsx
        loading={loadingFile}
      />
    </>
  );
}

export default withBreadcrumb(EventoCarga, EventoCargaBreadcrumb);

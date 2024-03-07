import DragDropFileUpload from '@app/components/FileUpload/DragDropFileUpload';
import { withBreadcrumb } from '@app/hocs';
import EventoCargaRepository from '@domains/evento-carga/repository/evento-carga.repository';
import { useState } from 'react';

function EventoCarga() {
  const [loadingFile, setLoadingFile] = useState(false);

  const onFileUpload = async (file: FileList) => {
    setLoadingFile(true);
    await EventoCargaRepository.uploadFile(file[0])
      .then(x => {
        console.log('Archivo enviado correctamente.');
        console.log('THEN', x);
      })
      .catch(error => {
        // TODO Puede devolver status code 400. Capturar y mostrar el mensaje en dialogo de notificacion.
        console.log('ERROR:', error);
      })
      .finally(() => {
        setLoadingFile(false);
      });
  };

  return (
    <DragDropFileUpload
      name='eventos-carga'
      onFileUpload={onFileUpload}
      accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // solo archivos .xlsx
      loading={loadingFile}
    />
  );
}

// TODO agregar withBreadcrumb
export default EventoCarga;

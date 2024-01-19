import { useCallback, useContext, useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';
import { EventoCampoCreateSchema, EventoCampoCreateSchemaType } from './schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { EventoCampoContext } from '@domains/evento-campo/contexts';
import { EventoCampoRepository } from '@domains/evento-campo/repository';
import { useConfirmDialog } from '@app/hooks';
import { TipoDatoDropdown } from '@domains/tipo-dato/container/tipo-dato-dropdown';
import { EventoDropdown } from '@domains/evento/container/evento-dropdown';
import { TablaDinamicaDropdown } from '@domains/metadatos/tabla-dinamica/container/tabla-dinamica-dropdown';

const EventoCampoCreate = () => {
  const _navigate = useNavigate();
  const { eventoId } = useParams();

  const { mainDataGrid } = useContext(EventoCampoContext);
  const confirmDialog = useConfirmDialog();
  const [disableTablaDinamica, setDisableTablaDinamica] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
    watch,
    resetField,
  } = useForm<EventoCampoCreateSchemaType>({
    defaultValues: {
      codigo: '',
      denominacion: '',
      descripcion: '',
      campo: '',
      eventoId: eventoId ? +eventoId : '',
      tipoDatoId: '',
      tablaDinamicaId: null,
    },
    resolver: zodResolver(EventoCampoCreateSchema),
  });

  const onSubmit: SubmitHandler<EventoCampoCreateSchemaType> = useCallback(
    async data => {
      await EventoCampoRepository.createEventoCampo(data)
        .then(() => {
          mainDataGrid.reload();
          _navigate(`/evento/${eventoId}/edit`);
        })
        .catch(err => {
          const error = JSON.parse(err.message);
          if (error?.statusCode === 400) {
            setError('codigo', { type: 'custom', message: error.message });
            confirmDialog.open({
              type: 'reject',
              title: 'No es posible realizar esta acción',
              message: `${error.message}`,
              onClickYes() {
                confirmDialog.close();
              },
            });
          }
        });
    },
    [_navigate, mainDataGrid, eventoId],
  );

  const handleClose = useCallback(() => {
    _navigate(`/evento/${eventoId}/edit`);
  }, [_navigate, eventoId]);

  useEffect(() => {
    const code = watch('tipoDatoId');
    if (code === 4) {
      resetField('tablaDinamicaId');
      setDisableTablaDinamica(false);
    } else {
      resetField('tablaDinamicaId');
      setDisableTablaDinamica(true);
    }
  }, [watch('tipoDatoId')]);

  return (
    <Modal isOpen onClose={handleClose} title='Nuevo Campo'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='create'>
        <Row>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Código' name='codigo' />
          </Col>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Denominación' name='denominacion' />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Descripción' name='descripcion' />
          </Col>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Campo' name='campo' />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <EventoDropdown control={control} name='eventoId' readOnly label='Evento' />
          </Col>
          <Col md={4}>
            <TipoDatoDropdown control={control} name='tipoDatoId' disabled={isSubmitting} label='Tipo Dato' />
          </Col>
          <Col md={4}>
            <TablaDinamicaDropdown
              control={control}
              name='tablaDinamicaId'
              disabled={isSubmitting || disableTablaDinamica}
              label='Tabla dinámica'
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EventoCampoCreate;

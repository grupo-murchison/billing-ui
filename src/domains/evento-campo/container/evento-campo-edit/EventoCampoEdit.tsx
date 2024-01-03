import { useCallback, useContext, useEffect } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';
import { EventoCampoEditSchema, EventoCampoEditSchemaType } from './schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { EventoCampoContext } from '@domains/evento-campo/contexts';
import { EventoCampoRepository } from '@domains/evento-campo/repository';
import { useConfirmDialog } from '@app/hooks';
import { TipoDatoDropdown } from '@domains/tipo-dato/container/tipo-dato-dropdown';
import { EventoDropdown } from '@domains/evento/container/evento-dropdown';

const EventoCampoEdit = () => {
  const _navigate = useNavigate();
  const { eventoId, eventoCampoId } = useParams();

  const { mainDataGrid } = useContext(EventoCampoContext);
  const confirmDialog = useConfirmDialog();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
    reset,
  } = useForm<EventoCampoEditSchemaType>({
    defaultValues: {
      codigo: '',
      denominacion: '',
      descripcion: '',
      campo: '',
      evento: eventoId ? +eventoId : '',
      tipoDatoId: '',
    },
    resolver: zodResolver(EventoCampoEditSchema),
  });

  const onSubmit: SubmitHandler<EventoCampoEditSchemaType> = useCallback(
    async data => {
      await EventoCampoRepository.updateEventoCampo({ ...data, id: Number(eventoCampoId) })
        .then(exito => {
          mainDataGrid.reload();
          _navigate(`/evento/${eventoId}`);
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
    EventoCampoRepository.getEventoCampoById(eventoCampoId || '').then(({ data }) => {
      reset(data);
    });
  }, [eventoId, eventoCampoId, reset]);

  return (
    <Modal isOpen onClose={handleClose} title='Editar Campo'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='update'>
        <Row>
          <Col md={6}>
            <FormTextField control={control} disabled label='Código' name='codigo' />
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
          <Col md={6}>
            <EventoDropdown control={control} name='evento' disabled label='Evento' />
          </Col>
          <Col md={6}>
            <TipoDatoDropdown control={control} name='tipoDatoId' disabled={isSubmitting} label='Tipo' />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EventoCampoEdit;

import { useCallback, useContext } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';
import { EventoRepository } from '@domains/evento/repository';
import { EventoCreateSchema, EventoCreateSchemaType } from './schemas';
import { EventoContext } from '@domains/evento/contexts';
import { TipoNegocioDropdown } from '../../../tipo-negocio/container/tipo-negocio-dropdown';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { useConfirmDialog } from '@app/hooks';

const EventoCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(EventoContext);
  const confirmDialog = useConfirmDialog();


  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError
  } = useForm<EventoCreateSchemaType>({
    defaultValues: {
      codigo: '',
      denominacion: '',
      descripcion: '',
      tipoNegocioId: '',
    },
    resolver: zodResolver(EventoCreateSchema),
  });

  const onSubmit: SubmitHandler<EventoCreateSchemaType> = useCallback(
    async data => {
      await EventoRepository.createEvento(data).then(exito => {
        mainDataGrid.reload();
        _navigate('/evento');
      }).catch(err => {
        const error = JSON.parse(err.message)
        if (error?.statusCode === 400) {
          setError('codigo', { type: 'custom', message: error.message });
          confirmDialog.open({
            type: 'reject',
            title: 'No es posible realizar esta acción',
            message: `${error.message}`,
            onClickYes() {
              confirmDialog.close()
            }
          });
        }
      })
    },
    [_navigate, mainDataGrid],
  );

  const handleClose = useCallback(() => {
    _navigate('/evento');
  }, [_navigate]);

  return (
    <Modal isOpen onClose={handleClose} title='Nuevo Evento'>
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
            <TipoNegocioDropdown control={control} name='tipoNegocioId' disabled={isSubmitting} label='Tipo de negocio' />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EventoCreate;

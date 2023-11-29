import { useCallback, useContext, useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';
import { EventoRepository } from '@domains/evento/repository';
import { EventoEditSchema, EventoEditSchemaType } from './schemas';
import { EventoContext } from '@domains/evento/contexts';
import { TipoNegocioDropdown } from '../../../tipo-negocio/container/tipo-negocio-dropdown';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { useConfirmDialog } from '@app/hooks';

const EventoEdit = () => {
  const { eventoId } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(EventoContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const confirmDialog = useConfirmDialog();


  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setError
  } = useForm<EventoEditSchemaType>({
    defaultValues: {
      codigo: '',
      denominacion: '',
      descripcion: '',
      tipoNegocioId: '',
    },
    resolver: zodResolver(EventoEditSchema),
  });

  useEffect(() => {
    EventoRepository.getEventoById(eventoId || '').then(({ data }) => {
      reset(data);
      setIsDataFetched(true);
    });
  }, [eventoId, reset]);

  const onSubmit: SubmitHandler<EventoEditSchemaType> = useCallback(
    async data => {
      await EventoRepository.updateEvento({ ...data, id: Number(eventoId) }).then(exito => {
        mainDataGrid.reload();
        _navigate('/evento');
      }).catch(err => {
        const error = JSON.parse(err.message)
        if (error?.statusCode === 400) {
          setError('codigo', {type: 'custom', message: error.message} );
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

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Editar Evento'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='update'>
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

export default EventoEdit;

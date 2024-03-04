import { Row, Col, Modal } from '@app/components';
import Form from '@app/components/Form/Form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { EventoCampoEditSchema, EventoCampoEditSchemaType } from '../evento-campo-edit/schemas';
import { EventoCampoRepository } from '@domains/evento-campo/repository';
import { EventoDropdown } from '@domains/evento/container/evento-dropdown';
import { TipoDatoDropdown } from '@domains/tipo-dato/container/tipo-dato-dropdown';
import { TablaDinamicaDropdown } from '@domains/metadatos/tabla-dinamica/container/tabla-dinamica-dropdown';

const EventoCampoView = () => {
  const { eventoId, eventoCampoId } = useParams();
  const _navigate = useNavigate();
  const url = useLocation();
  const canEdit = url?.pathname?.includes('edit') ? true : false;

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    if (canEdit) {
      _navigate(`/evento/${eventoId}/edit/`);
    } else {
      _navigate(`/evento/${eventoId}/`);
    }
  }, [_navigate]);

  useEffect(() => {
    EventoCampoRepository.getEventoCampoById(eventoCampoId || '').then(({ data }) => {
      reset(data);
      setIsDataFetched(true);
    });
  }, [eventoCampoId]);

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
      eventoId: eventoId ? +eventoId : '',
      tipoDatoId: '',
    },
    resolver: zodResolver(EventoCampoEditSchema),
  });

  if (!isDataFetched) {
    return <></>;
  }
  return (
    <Modal isOpen onClose={handleClose} title='Campo del Evento'>
      <Form>
        <Row>
          <Col md={6}>
            <FormTextField control={control} InputProps={{ readOnly: true }} label='Código' name='codigo' />
          </Col>
          <Col md={6}>
            <FormTextField control={control} InputProps={{ readOnly: true }} label='Denominación' name='denominacion' />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormTextField control={control} InputProps={{ readOnly: true }} label='Descripción' name='descripcion' />
          </Col>
          <Col md={6}>
            <FormTextField control={control} InputProps={{ readOnly: true }} label='Campo' name='campo' />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <EventoDropdown control={control} name='eventoId' readOnly label='Evento' />
          </Col>
          <Col md={4}>
            <TipoDatoDropdown control={control} name='tipoDatoId' readOnly label='Tipo' />
          </Col>
          <Col md={4}>
            <TablaDinamicaDropdown control={control} name='tablaDinamicaId' readOnly label='Tabla dinámica' />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EventoCampoView;

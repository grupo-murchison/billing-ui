import { Row, Col, Modal } from '@app/components';
import Form from '@app/components/Form/Form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { DatoDinamicoRepository } from '../../repository';
import { DatoDinamicoEditSchema, DatoDinamicoEditSchemaType } from '../dato-dinamico-edit/schemas';
import { TablaDinamicaDropdown } from '@domains/metadatos/tabla-dinamica/container/tabla-dinamica-dropdown';
import FormCheckbox from '@app/components/Form/FormInputs/FormCheckbox';

const DatoDinamicoView = () => {
  const { tablaDinamicaId, datoDinamicoId } = useParams();
  const _navigate = useNavigate();
  const url = useLocation();
  const canEdit = url?.pathname?.includes('edit') ? true : false;

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    if (canEdit) {
      _navigate(`/tabla-dinamica/${tablaDinamicaId}/edit/`);
    } else {
      _navigate(`/tabla-dinamica/${tablaDinamicaId}/`);
    }
  }, [_navigate]);

  useEffect(() => {
    DatoDinamicoRepository.getDatoDinamicoById(datoDinamicoId || '').then(({ data }) => {
      reset(data);
      setIsDataFetched(true);
    });
  }, [datoDinamicoId]);

  const { reset, control } = useForm<DatoDinamicoEditSchemaType>({
    defaultValues: {
      tablaDinamicaId: tablaDinamicaId ? +tablaDinamicaId : '',
      codigo: '',
      valor: '',
      activo: false,
    },
    resolver: zodResolver(DatoDinamicoEditSchema),
  });

  if (!isDataFetched) {
    return <></>;
  }
  return (
    <Modal isOpen onClose={handleClose} title='Detalles Dato Dinámico'>
      <Form>
        <Row>
          <Col md={6}>
            <TablaDinamicaDropdown control={control} readOnly label='Tabla' name='tablaDinamicaId' />
          </Col>
          <Col md={6}>
            <FormTextField control={control} label='Código' name='codigo' InputProps={{ readOnly: true }} />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormTextField control={control} label='Valor' name='valor' InputProps={{ readOnly: true }} />
          </Col>
          <Col md={6}>
            <FormCheckbox control={control} name='activo' label='Activo' labelPlacement='end' disabled />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default DatoDinamicoView;

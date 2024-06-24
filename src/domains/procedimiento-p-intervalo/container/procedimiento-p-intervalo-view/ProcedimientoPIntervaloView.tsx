import { useCallback, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoPIntervaloRepository } from '@domains/procedimiento-p-intervalo/repository';
import { ProcedimientoPIntervaloEditSchema } from '@domains/procedimiento-p-intervalo/container/procedimiento-p-intervalo-edit/schemas';
import type { ProcedimientoPIntervaloEditSchemaType } from '@domains/procedimiento-p-intervalo/container/procedimiento-p-intervalo-edit/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { useLocationMode } from '@app/hooks';

const ProcedimientoPIntervaloView = () => {
  const _navigate = useNavigate();
  const { canEdit } = useLocationMode();

  const { procedimientoPId, procedimientoPIntervaloId } = useParams();

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<ProcedimientoPIntervaloEditSchemaType>({
    resolver: zodResolver(ProcedimientoPIntervaloEditSchema),
  });

  const handleClose = useCallback(() => {
    if (canEdit) {
      _navigate(`/procedimiento-p/${procedimientoPId}/edit`);
    } else {
      _navigate(`/procedimiento-p/${procedimientoPId}/`);
    }
  }, [_navigate, procedimientoPId]);

  useEffect(() => {
    ProcedimientoPIntervaloRepository.getProcedimientoPIntervaloById(procedimientoPIntervaloId || '').then(
      ({ data }) => {
        reset(data);
        setIsDataFetched(true);
      },
    );
  }, [procedimientoPIntervaloId, reset]);

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Intervalo Procedimiento Producto Softland'>
      <Form>
        <Row>
          <Col md={6}>
            <FormTextField
              control={control}
              disabled={isSubmitting}
              label='Intervalo'
              name='intervalo'
              type='number'
              InputProps={{ readOnly: true }}
            />
          </Col>
          <Col md={6}>
            <FormTextField
              control={control}
              disabled={isSubmitting}
              label='Valor Inicial'
              name='valorInicial'
              type='number'
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormTextField
              control={control}
              disabled={isSubmitting}
              label='Valor Final'
              name='valorFinal'
              type='number'
              InputProps={{ readOnly: true }}
            />
          </Col>
          <Col md={6}>
            <FormTextField
              control={control}
              disabled={isSubmitting}
              label='Precio'
              name='precio'
              type='number'
              InputProps={{ readOnly: true }}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProcedimientoPIntervaloView;

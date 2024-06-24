import { useCallback, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoPSIntervaloRepository } from '@domains/procedimiento-ps-intervalo/repository';
import { ProcedimientoPSIntervaloEditValidationSchema } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-edit/schemas';
import type { ProcedimientoPSIntervaloEditFormDataType } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-edit/schemas';

import { ProductoSoftlandDropdown } from '@domains/producto-softland/container/producto-softland-dropdown';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { useLocationMode } from '@app/hooks';

const ProcedimientoPSIntervaloView = () => {
  const _navigate = useNavigate();
  const { procedimientoPSId, procedimientoPSIntervaloId } = useParams();
  const { canEdit } = useLocationMode();
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const { reset, control } = useForm<ProcedimientoPSIntervaloEditFormDataType>({
    defaultValues: {
      valorInicial: 1,
      valorFinal: 9999999,
      productoSoftlandId: undefined,
      intervalo: undefined,
    },
    resolver: zodResolver(ProcedimientoPSIntervaloEditValidationSchema),
  });

  const handleClose = useCallback(() => {
    if (canEdit) {
      _navigate(`/procedimiento-ps/${procedimientoPSId}/edit`);
    } else {
      _navigate(`/procedimiento-ps/${procedimientoPSId}`);
    }
  }, [_navigate, procedimientoPSId]);

  useEffect(() => {
    ProcedimientoPSIntervaloRepository.getProcedimientoPSIntervaloById(procedimientoPSIntervaloId || '').then(
      ({ data }) => {
        reset(data);
        setIsDataFetched(true);
      },
    );
  }, [procedimientoPSIntervaloId, reset]);

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Intervalos Procedimiento Producto Softland'>
      <Form>
        <Row>
          <Col md={6}>
            <ProductoSoftlandDropdown
              control={control}
              name='productoSoftlandId'
              label='Producto Softland'
              emptyOption
              readOnly
            />
          </Col>
          <Col md={6}>
            <FormTextField
              control={control}
              label='Intervalo'
              name='intervalo'
              type='number'
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormTextField
              control={control}
              InputProps={{ readOnly: true }}
              label='Valor Inicial'
              name='valorInicial'
              type='number'
              fullWidth
            />
          </Col>
          <Col md={6}>
            <FormTextField
              control={control}
              InputProps={{ readOnly: true }}
              name='valorFinal'
              label='Valor Final'
              type='number'
              fullWidth
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProcedimientoPSIntervaloView;

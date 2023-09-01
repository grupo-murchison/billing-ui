import { useCallback, useContext, useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoPIntervaloRepository } from '@domains/procedimiento-p-intervalo/repository';
import { ProcedimientoPIntervaloEditSchema } from '@domains/procedimiento-p-intervalo/container/procedimiento-p-intervalo-edit/schemas';
import { ProcedimientoPIntervaloContext } from '@domains/procedimiento-p-intervalo/contexts';
import type { ProcedimientoPIntervaloEditSchemaType } from '@domains/procedimiento-p-intervalo/container/procedimiento-p-intervalo-edit/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';

const ProcedimientoPIntervaloEdit = () => {
  const _navigate = useNavigate();
  const { procedimientoPId, procedimientoPIntervaloId } = useParams();

  const { mainDataGrid } = useContext(ProcedimientoPIntervaloContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ProcedimientoPIntervaloEditSchemaType>({
    resolver: zodResolver(ProcedimientoPIntervaloEditSchema),
  });

  const onSubmit: SubmitHandler<ProcedimientoPIntervaloEditSchemaType> = useCallback(
    async data => {
      await ProcedimientoPIntervaloRepository.updateProcedimientoPIntervalo(data);
      mainDataGrid.reload();
      _navigate(`/procedimiento-p/${procedimientoPId}`);
    },
    [_navigate, mainDataGrid, procedimientoPId],
  );

  const handleClose = useCallback(() => {
    _navigate(`/procedimiento-p/${procedimientoPId}`);
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
    <Modal isOpen onClose={handleClose} title='Editar Intervalo Procedimiento Producto Softland'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='update'>
        <Row>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Intervalo' name='intervalo' type='number' />
          </Col>
          <Col md={6}>
            <FormTextField
              control={control}
              disabled={isSubmitting}
              label='Valor Inicial'
              name='valorInicial'
              type='number'
              fullWidth
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
            />
          </Col>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Precio' name='precio' type='number' />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProcedimientoPIntervaloEdit;

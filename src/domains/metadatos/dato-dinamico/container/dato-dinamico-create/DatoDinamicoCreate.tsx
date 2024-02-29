import { useCallback, useContext } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { DatoDinamicoCreateSchema, DatoDinamicoCreateSchemaType } from './schemas';
import { useConfirmDialog } from '@app/hooks';
import { DatoDinamicoContext } from '../../contexts';
import DatoDinamicoRepository from '../../repository/dato-dinamico.repository';
import FormCheckbox from '@app/components/Form/FormInputs/FormCheckbox';
import { TablaDinamicaDropdown } from '@domains/metadatos/tabla-dinamica/container/tabla-dinamica-dropdown';

const DatoDinamicoCreate = () => {
  const _navigate = useNavigate();
  const { tablaDinamicaId } = useParams();

  const { mainDataGrid } = useContext(DatoDinamicoContext);
  const confirmDialog = useConfirmDialog();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm<DatoDinamicoCreateSchemaType>({
    defaultValues: {
      tablaDinamicaId: tablaDinamicaId ? +tablaDinamicaId : '',
      codigo: '',
      valor: '',
      activo: false,
    },
    resolver: zodResolver(DatoDinamicoCreateSchema),
  });

  const onSubmit: SubmitHandler<DatoDinamicoCreateSchemaType> = useCallback(
    async data => {
      await DatoDinamicoRepository.createDatoDinamico(data)
        .then(() => {
          mainDataGrid.reload();
          _navigate(`/tabla-dinamica/${tablaDinamicaId}/edit`);
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
    [_navigate, mainDataGrid],
  );

  const handleClose = useCallback(() => {
    _navigate(`/tabla-dinamica/${tablaDinamicaId}/edit`);
  }, [_navigate]);

  return (
    <Modal isOpen onClose={handleClose} title='Nuevo Dato Dinámico'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='create'>
        <Row>
          <Col md={6}>
            <TablaDinamicaDropdown control={control} disabled label='Tabla' name='tablaDinamicaId' />
          </Col>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Código' name='codigo' />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Valor' name='valor' />
          </Col>
          <Col md={6}>
            <FormCheckbox control={control} name='activo' label='Activo' labelPlacement='end' disabled={isSubmitting} />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default DatoDinamicoCreate;

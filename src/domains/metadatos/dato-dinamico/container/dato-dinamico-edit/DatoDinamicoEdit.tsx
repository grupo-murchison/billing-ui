import { useCallback, useEffect, useState, useContext } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { DatoDinamicoContext } from '../../contexts';
import { DatoDinamicoEditSchema, DatoDinamicoEditSchemaType } from './schemas';
import DatosDinamicosRepository from '../../repository/dato-dinamico.repository';
import { useConfirmDialog } from '@app/hooks';
import FormCheckbox from '@app/components/Form/FormInputs/FormCheckbox';
import { TablaDinamicaDropdown } from '@domains/metadatos/tabla-dinamica/container/tabla-dinamica-dropdown';
import DatoDinamicoRepository from '../../repository/dato-dinamico.repository';

const DatoDinamicoEdit = () => {
  const { tablaDinamicaId, datoDinamicoId } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(DatoDinamicoContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const confirmDialog = useConfirmDialog();

  const {
    reset,
    formState: { isSubmitting },
    handleSubmit,
    control,
    setError,
  } = useForm<DatoDinamicoEditSchemaType>({
    defaultValues: {
      tablaDinamicaId: tablaDinamicaId ? +tablaDinamicaId : '',
      codigo: '',
      valor: '',
      activo: false,
    },
    resolver: zodResolver(DatoDinamicoEditSchema),
  });

  useEffect(() => {
    DatosDinamicosRepository.getDatoDinamicoById(datoDinamicoId || '').then(({ data }) => {
      reset(data);
      setIsDataFetched(true);
    });
  }, [tablaDinamicaId, datoDinamicoId, reset]);

  const handleClose = useCallback(() => {
    _navigate(`/tabla-dinamica/${tablaDinamicaId}/edit`);
  }, [_navigate]);

  const onSubmit: SubmitHandler<DatoDinamicoEditSchemaType> = useCallback(
    async data => {
      await DatoDinamicoRepository.updateDatoDinamico({ ...data, id: Number(datoDinamicoId) })
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
    [_navigate, mainDataGrid, datoDinamicoId],
  );

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Editar Dato Dinámico'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='update'>
        <Row>
          <Col md={6}>
            <TablaDinamicaDropdown control={control} disabled label='Tabla' name='tablaDinamicaId' />
          </Col>
          <Col md={6}>
            <FormTextField control={control} disabled label='Código' name='codigo' />
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

export default DatoDinamicoEdit;

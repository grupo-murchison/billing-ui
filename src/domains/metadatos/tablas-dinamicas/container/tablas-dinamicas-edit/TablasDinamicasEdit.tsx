import { useCallback, useEffect, useState, useContext } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { TablasDinamicasContext } from '../../contexts';
import { TablasDinamicasEditSchema, TablasDinamicasEditSchemaType } from './schemas';
import TablasDinamicasRepository from '../../repository/tablas-dinamicas.repository';

const TablasDinamicasEdit = () => {
  const { tablaId } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(TablasDinamicasContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    reset,
    formState: { isSubmitting },
    handleSubmit,
    control,
  } = useForm<TablasDinamicasEditSchemaType>({
    defaultValues: {
      nombreTabla: '',
      descripcionTabla: '',
    },
    resolver: zodResolver(TablasDinamicasEditSchema),
  });

  useEffect(() => {
    TablasDinamicasRepository.getTablasDinamicasById(tablaId || '').then(({ data }) => {
      reset(data);
      setIsDataFetched(true);
    });
  }, [tablaId, reset]);

  const handleClose = useCallback(() => {
    _navigate('/tablas-dinamicas');
  }, [_navigate]);

  const onSubmit: SubmitHandler<TablasDinamicasEditSchemaType> = useCallback(
    async data => {
      await TablasDinamicasRepository.updateTablasDinamicas({ ...data, id: Number(tablaId) });
      mainDataGrid.reload();
      _navigate('/tablas-dinamicas');
    },
    [_navigate, mainDataGrid],
  );

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Editar Tabla Dinámica'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='update'>
        {' '}
        <Row>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Nombre' name='nombreTabla' />
          </Col>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Descripción' name='descripcionTabla' />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default TablasDinamicasEdit;

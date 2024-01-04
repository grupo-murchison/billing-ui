import { Row, Col, Modal } from '@app/components';
import Form from '@app/components/Form/Form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { DatosDinamicosRepository } from '../../repository';
import { DatosDinamicosEditSchema, DatosDinamicosEditSchemaType } from '../datos-dinamicos-edit/schemas';
import { TablasDinamicasDropdown } from '@domains/metadatos/tablas-dinamicas/container/tablas-dinamicas-dropdown';
import FormCheckbox from '@app/components/Form/FormInputs/FormCheckbox';

const DatosDinamicosView = () => {
  const { tablaId, datoId } = useParams();
  const _navigate = useNavigate();
  const url = useLocation();
  const canEdit = url?.pathname?.includes('edit') ? true : false;

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    if (canEdit) {
      _navigate(`/tablas-dinamicas/${tablaId}/edit/`);
    } else {
      _navigate(`/tablas-dinamicas/${tablaId}/`);
    }
  }, [_navigate]);

  useEffect(() => {
    DatosDinamicosRepository.getDatosDinamicosById(datoId || '').then(({ data }) => {
      reset(data);
      setIsDataFetched(true);
    });
  }, [datoId]);

  const { reset, control } = useForm<DatosDinamicosEditSchemaType>({
    defaultValues: {
      tablaId: tablaId ? +tablaId : '',
      campoCodigo: '',
      campoValor: '',
      activo: false,
    },
    resolver: zodResolver(DatosDinamicosEditSchema),
  });

  if (!isDataFetched) {
    return <></>;
  }
  return (
    <Modal isOpen onClose={handleClose} title='Detalles Dato Dinámico'>
      <Form>
        <Row>
          <Col md={6}>
            <TablasDinamicasDropdown control={control} readOnly label='Tabla' name='tablaId' />
          </Col>
          <Col md={6}>
            <FormTextField control={control} label='Código' name='campoCodigo' InputProps={{ readOnly: true }} />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormTextField control={control} label='Valor' name='campoValor' InputProps={{ readOnly: true }} />
          </Col>
          <Col md={6}>
            <FormCheckbox control={control} name='activo' label='Activo' labelPlacement='end' disabled />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default DatosDinamicosView;

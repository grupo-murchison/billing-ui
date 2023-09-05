import { useCallback, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoQRepository } from '@domains/procedimiento-q/repository';
import { ProcedimientoQEditSchema } from '@domains/procedimiento-q/container/procedimiento-q-edit/schemas';
import type { ProcedimientoQEditSchemaType } from '@domains/procedimiento-q/container/procedimiento-q-edit/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { TextField } from '@mui/material';
import { label } from '@domains/procedimiento-q/constants';
import { TipoProcedimientoQDropdown } from '@domains/tipo-procedimiento-q/container/tipo-procedimiento-q-dropdown';
import { ProcedimientoCustomDropdown } from '@domains/procedimiento-custom/container/procedimiento-custom-dropdown';
import { ProcedimientoBuiltinDropdown } from '@domains/procedimiento-builtin/container/procedimiento-builtin-dropdown';
import Form from '@app/components/Form/Form';

const ProcedimientoQEdit = () => {
  const { procedimientoQId } = useParams();
  const _navigate = useNavigate();

  const [procedimientoQ, setProcedimientoQ] = useState<AnyValue>();
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const { reset } = useForm<ProcedimientoQEditSchemaType>({
    resolver: zodResolver(ProcedimientoQEditSchema),
  });

  const handleClose = useCallback(() => {
    _navigate('/procedimiento-q');
  }, [_navigate]);

  useEffect(() => {
    ProcedimientoQRepository.getProcedimientoQById(procedimientoQId || '').then(({ data }) => {
      setProcedimientoQ(data);
      setIsDataFetched(true);
    });
  }, [procedimientoQId, reset]);

  if (!isDataFetched) {
    return <></>;
  }

  // //TODO creo esta constante para que no rompa.
  const isSubmitting = false;

  return (
    <Modal isOpen onClose={handleClose} title={label.procedimientoQ}>
      <Form handleClose={handleClose} isSubmitting={isSubmitting}>
        <Row>
          <Col md={6}>
            <TextField
              id='codigo'
              label='Código'
              InputProps={{
                readOnly: true,
              }}
              defaultValue={procedimientoQ.codigo}
              fullWidth
            />
          </Col>
          <Col md={6}>
            <TextField
              id='denominacion'
              label='Denominación'
              InputProps={{
                readOnly: true,
              }}
              defaultValue={procedimientoQ.denominacion}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TextField
              id='descripcion'
              label='Descripción'
              InputProps={{
                readOnly: true,
              }}
              defaultValue={procedimientoQ.descripcion}
              fullWidth
            />
          </Col>
          <Col md={6}>
            <TipoProcedimientoQDropdown
              id='tipoProcedimientoQ'
              label={`Tipo ${label.procedimientoQ}`}
              disabled
              value={procedimientoQ.tipoProcedimientoQId}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <ProcedimientoCustomDropdown
              id='procedimientoCustom'
              label='Procedimiento Custom'
              disabled
              value={procedimientoQ.procedimientoCustomId}
            />
          </Col>
          <Col md={6}>
            <ProcedimientoBuiltinDropdown
              id='procedimientoBuiltin'
              label='Procedimiento Builtin'
              disabled
              value={procedimientoQ.procedimientoBuiltinId}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProcedimientoQEdit;

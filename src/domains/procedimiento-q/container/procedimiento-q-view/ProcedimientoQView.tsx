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

const ProcedimientoQEdit = () => {
  const { procedimientoQId } = useParams();
  const _navigate = useNavigate();

  const [procedimientoQ, setProcedimientoQ] = useState<AnyValue>();
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const { register, reset } = useForm<ProcedimientoQEditSchemaType>({
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

  return (
    <Modal isOpen onClose={handleClose} title={label.procedimientoQ}>
      <form noValidate autoComplete='off'>
        <Row>
          <Col md={6}>
            <TextField
              id='codigo'
              label='Código'
              {...register('codigo')}
              disabled
              defaultValue={procedimientoQ.codigo}
            />
          </Col>
          <Col md={6}>
            <TextField
              id='denominacion'
              label='Denominación'
              {...register('denominacion')}
              disabled
              defaultValue={procedimientoQ.denominacion}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TextField
              id='descripcion'
              label='Descripción'
              {...register('descripcion')}
              disabled
              defaultValue={procedimientoQ.descripcion}
            />
          </Col>
          <Col md={6}>
            <TipoProcedimientoQDropdown
              id='tipoProcedimientoQ'
              label={`Tipo ${label.procedimientoQ}`}
              {...register('tipoProcedimientoQId', {
                valueAsNumber: true,
              })}
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
              {...register('procedimientoCustomId', {
                valueAsNumber: true,
              })}
              disabled
              value={procedimientoQ.procedimientoCustomId}
            />
          </Col>
          <Col md={6}>
            <ProcedimientoBuiltinDropdown
              id='procedimientoBuiltin'
              label='Procedimiento Builtin'
              {...register('procedimientoBuiltinId', {
                valueAsNumber: true,
              })}
              disabled
              value={procedimientoQ.procedimientoBuiltinId}
            />
          </Col>
        </Row>
      </form>
    </Modal>
  );
};

export default ProcedimientoQEdit;

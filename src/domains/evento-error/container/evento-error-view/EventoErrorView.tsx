import { Row, Col, Modal } from '@app/components';
import { Box, FormLabel, Typography } from '@mui/material';

import Form from '@app/components/Form/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { EventoRepository } from '@domains/evento/repository';
import { EventoCampoRoutes } from '@domains/evento-campo/navigation';
import { TipoNegocioDropdown } from '@domains/tipo-negocio/container/tipo-negocio-dropdown';
import { useForm } from 'react-hook-form';
// import { EventoViewSchema, EventoViewSchemaType } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';

const EventoErrorView = () => {
    const { eventoId } = useParams();
    const _navigate = useNavigate();

    const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

    const handleClose = useCallback(() => {
        _navigate('/evento-error');
    }, [_navigate]);

    useEffect(() => {
        EventoRepository.getEventoById(eventoId || '').then(({ data }) => {
            reset(data);
            setIsDataFetched(true);
        });
    }, [eventoId]);

    const { control, reset } = useForm<any>({
        defaultValues: {
            codigo: '',
            denominacion: '',
            descripcion: '',
            tipoNegocioId: '',
        },
        // resolver: zodResolver(EventoViewSchema),
    });

    if (!isDataFetched) {
        return <></>;
    }
    return (
        <Modal isOpen onClose={handleClose} title='Detalle Evento'>
            <Form>
                <Row>
                    <Col md={6}>
                        <FormTextField
                            control={control}
                            label='Código'
                            fullWidth
                            name='codigo'
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Col>
                    <Col md={6}>
                        <FormTextField
                            control={control}
                            label='Denominación'
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            name='denominacion'
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormTextField
                            control={control}
                            label='Descripción'
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            name='descripcion'
                        />
                    </Col>
                    <Col md={6}>
                        <TipoNegocioDropdown control={control} name='tipoNegocioId' readOnly label='Tipo de negocio' />{' '}
                    </Col>
                </Row>
            </Form>
            <Box my={2}>
                <FormLabel component='legend'>
                    <Typography variant='h6' component='div'>
                        Campos del evento
                    </Typography>
                </FormLabel>
            </Box>
            <EventoCampoRoutes />
        </Modal>
    );
};

export default EventoErrorView;

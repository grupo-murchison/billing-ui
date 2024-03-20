import { Row, Col, Modal } from '@app/components';
import { Box, FormLabel, Typography } from '@mui/material';

import Form from '@app/components/Form/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import DataGridBase from '@app/components/DataGrid/DataGridBase';
import { EventoErrorRepository } from '@domains/evento-error/repository';

const EventoErrorView = () => {
    const { eventoId } = useParams();
    const _navigate = useNavigate();

    const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
    const [errorsDataGrid, setErrorsDataGrid] = useState<Array<any>>([]);


    const handleClose = useCallback(() => {
        _navigate('/evento-error');
    }, [_navigate]);

    useEffect(() => {
        EventoErrorRepository.getEventoById(eventoId || '').then(({ data }) => {
            const values = {
                numeroEvento: data[0]?.evento_revision_cabecera_id, // numero evento
                clientId: data[0]?.clientId, // cliente
                codigoEvento: data[0]?.type, // codigo evento
                fecha: data[0]?.createdSource,// fecha
            }

            reset(values);
            setIsDataFetched(true);
            setErrorsDataGrid(data?.errors)
        });
    }, [eventoId]);

    const { control, reset } = useForm<any>({
        defaultValues: {
            numeroEvento: '',
            clientId: '',
            codigoEvento: '',
            fecha: '',

        },
        // resolver: zodResolver(EventoViewSchema),
    });

    if (!isDataFetched) {
        return <></>;
    }
    return (
        <Modal isOpen onClose={handleClose} title='Log Detalle'>
            <Form>
                <Row>
                    <Col md={6}>
                        <FormTextField
                            control={control}
                            label='Numero Evento'
                            fullWidth
                            name='numeroEvento'
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Col>
                    <Col md={6}>
                        <FormTextField
                            control={control}
                            label='Cliente'
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            name='clientId'
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormTextField
                            control={control}
                            label='Codigo Evento'
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            name='codigoEvento'
                        />
                    </Col>
                    <Col md={6}>
                        <FormTextField
                            control={control}
                            label={'Fecha'}
                            name='fecha'
                            inputProps={{ readOnly: true }}
                            fullWidth
                        />
                    </Col>
                </Row>
            </Form>
            <Box my={2}>
                <FormLabel component='legend'>
                    <Typography variant='h6' component='div'>
                        Detalles de los Errores
                    </Typography>
                </FormLabel>
            </Box>
            <DataGridBase rows={errorsDataGrid} columns={[
                {
                    field: 'id',
                    headerName: 'Tipo de Mensaje',
                    flex: 0.2,
                },
                {
                    field: 'mensaje',
                    headerName: 'Descripcion'
                }]} />
        </Modal>
    );
};

export default EventoErrorView;

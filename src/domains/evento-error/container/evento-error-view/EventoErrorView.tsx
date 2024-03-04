// import { useCallback, useEffect, useState } from 'react';

// import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

// import { MonedaDropdown } from '@domains/moneda/container/moneda-dropdown';

// import { ProcedimientoPRepository } from '@domains/procedimiento-p/repository';

// import { ProcedimientoPIntervaloWithinProcedimientoPRoutes } from '@domains/procedimiento-p-intervalo/navigation';

// import { TextField } from '@mui/material';

// import { zodResolver } from '@hookform/resolvers/zod';

// import { useForm } from 'react-hook-form';
// import Form from '@app/components/Form/Form';
// // import { ProcedimientoPEditSchema, ProcedimientoPEditSchemaType } from './schemas';

//TODO: complete
const EventoErrorView = () => {


    return (
        <Modal isOpen onClose={() => { console.log('click') }} title='Ver Procedimiento Precio'>
            {/* <Form isSubmitting={isSubmitting}>
                <Row>
                    <Col md={6}>
                        <TextField id='codigo' label='Código' defaultValue={procedimientoPData.codigo} fullWidth disabled />
                    </Col>
                    <Col md={6}>
                        <TextField
                            id='denominacion'
                            label='Denominación'
                            defaultValue={procedimientoPData.denominacion}
                            fullWidth
                            disabled
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <MonedaDropdown control={control} name='monedaId' disabled label='Moneda' />
                    </Col>
                </Row>
            </Form>

            <ProcedimientoPIntervaloWithinProcedimientoPRoutes codigo={procedimientoPData.codigo} /> */}
        </Modal>
    );
};

export default EventoErrorView;

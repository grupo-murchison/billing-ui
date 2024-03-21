import { Alert, AlertTitle, Box, Collapse } from '@mui/material';
import { useState } from 'react';

export const AlertInProgress = ({ message }: { message?: string }) => {
  // const openAlert = useRef(true);
  const [openAlert, setOpenAlert] = useState<boolean>(true);
  return (
    <>
      {openAlert && (
        <Box sx={{ my: '1.15rem' }}>
          <Collapse in={openAlert}>
            <Alert
              onClose={() => {
                setOpenAlert(false);
                // openAlert.current = false;
              }}
              severity='warning'
              variant='standard'
            >
              <AlertTitle>Atención</AlertTitle>
              {message ? message : 'Esta sección aún está en etapa de desarrollo!'}
            </Alert>
          </Collapse>
        </Box>
      )}
    </>
  );
};

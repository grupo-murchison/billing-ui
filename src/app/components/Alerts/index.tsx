import { Alert, AlertTitle, Box, Collapse } from '@mui/material';
import { useState } from 'react';

export const AlertInProgress = () => {
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
              variant='filled'
            >
              <AlertTitle>Atención</AlertTitle>
              Esta sección aún está en etapa de desarrollo!
            </Alert>
          </Collapse>
        </Box>
      )}
    </>
  );
};

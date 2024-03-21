import { Backdrop as BackdropMUI, CircularProgress } from '@mui/material';

function Backdrop({ open }: Backdrop) {
  return (
    <BackdropMUI
      sx={{ color: theme => theme.palette.common.white, zIndex: theme => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color='inherit' />
    </BackdropMUI>
  );
}

type Backdrop = {
  open: boolean;
};

export default Backdrop;

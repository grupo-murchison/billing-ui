import type { ReactNode } from 'react';

import { Unstable_Grid2 } from '@mui/material';

const Row = (props: RowProps) => {
  return <Unstable_Grid2 container spacing={1} marginBottom={1} {...props} />;
};

type RowProps = {
  children: ReactNode;
};

export default Row;

import { useContext } from 'react';
import { Head, Body } from '@app/pro-components/DataGrid/components/Table/components';

import styles from '@app/pro-components/DataGrid/components/Table/Table.module.scss';
import { DataGridContext } from '../../contexts';
import { Box, LinearProgress } from '@mui/material';

const Table = () => {
  const { loading, error } = useContext(DataGridContext);

  return (
    <table className={styles['table']} cellSpacing='0' cellPadding='0'>
      {loading ? (
        <>
          <Box sx={{ width: '100%' }}>
            <LinearProgress sx={{ height: 7 }} />
          </Box>
          {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </Box> */}
        </>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <Head />
          <Body />
        </>
      )}
    </table>
  );
};

export default Table;

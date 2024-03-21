import { useContext } from 'react';

import { DataGridContext } from '@app/pro-components/DataGrid/contexts';

import { UuidLib } from '@libs';

import styles from '@app/pro-components/DataGrid/components/Table/components/Body/Body.module.scss';

const TableBody = () => {
  const { rowTemplate, rows } = useContext(DataGridContext);

  return (
    <tbody className={styles['body']}>
      {rows.map(row => {
        return <tr key={UuidLib.newUuid()}>{rowTemplate(row)}</tr>;
      })}
    </tbody>
  );
};

export default TableBody;

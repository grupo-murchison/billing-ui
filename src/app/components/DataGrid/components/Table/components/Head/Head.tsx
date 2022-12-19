import { useContext } from 'react';

import { DataGridContext } from '@app/components/DataGrid/contexts';

import { UuidLib } from '@libs';

import styles from '@app/components/DataGrid/components/Table/components/Head/Head.module.scss';

const TableHead = () => {
  const { columnHeads } = useContext(DataGridContext);

  return (
    <thead className={styles['head']}>
      <tr>
        {columnHeads.map(colHead => (
          <th key={UuidLib.newUuid()}>{colHead.label}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;

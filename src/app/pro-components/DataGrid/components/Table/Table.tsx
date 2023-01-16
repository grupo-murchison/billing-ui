import { Head, Body } from '@app/pro-components/DataGrid/components/Table/components';

import styles from '@app/pro-components/DataGrid/components/Table/Table.module.scss';

const Table = () => {
  return (
    <table className={styles['table']} cellSpacing='0' cellPadding='0'>
      <Head />
      <Body />
    </table>
  );
};

export default Table;

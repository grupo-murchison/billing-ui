import { useContext } from 'react';

import clsx from 'clsx';

import { SearchIcon, AddIcon, FilterAltIcon, DownloadIcon } from '@assets/icons';

import { DataGridContext } from '@app/pro-components/DataGrid/contexts';
import { ActionButton } from '@app/pro-components/DataGrid/components/Toolbar/components';

import styles from '@app/pro-components/DataGrid/components/Toolbar/Toolbar.module.scss';

const Toolbar = ({ className }: ToolbarProps) => {
  const { onClickNew } = useContext(DataGridContext);

  return (
    <div className={clsx(styles['toolbar'], className)}>
      <ActionButton color='black' icon={<SearchIcon />} label='Buscar' />
      <ActionButton color='black' icon={<FilterAltIcon />} label='Filtrar' />
      <ActionButton color='green' icon={<AddIcon />} label='Alta' onClick={onClickNew} />
      <ActionButton color='green' icon={<DownloadIcon />} label='Exportar' />
    </div>
  );
};

type ToolbarProps = {
  className?: string;
};

export default Toolbar;

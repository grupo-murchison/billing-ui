import type { ReactNode } from 'react';

import clsx from 'clsx';

import styles from '@app/pro-components/DataGrid/components/Toolbar/components/ActionButton/ActionButton.module.scss';

const ActionButton = ({ color, icon, label, onClick }: ActionButtonProps) => {
  return (
    <button
      className={clsx(styles['action-button'], {
        [styles['action-button--green']]: color === 'green',
      })}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

type ActionButtonProps = {
  icon: ReactNode;
  label: string;
  color: 'black' | 'green';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default ActionButton;

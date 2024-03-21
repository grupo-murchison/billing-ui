import { useContext } from 'react';

import clsx from 'clsx';

import { DataGridContext } from '@app/pro-components/DataGrid/contexts';

import { KeyboardArrowLeftIcon, KeyboardArrowRightIcon } from '@assets/icons';

import styles from '@app/pro-components/DataGrid/components/Pagination/components/ArrowButtons/ArrowButtons.module.scss';

const ArrowButtons = ({ className }: ArrowButtonsProps) => {
  const { currentPage, handleNextPageChange, handlePrevPageChange } = useContext(DataGridContext);

  return (
    <div className={clsx(styles['arrow-buttons'], className)}>
      <button onClick={handlePrevPageChange} disabled={currentPage === 0}>
        <KeyboardArrowLeftIcon />
      </button>
      <button onClick={handleNextPageChange}>
        <KeyboardArrowRightIcon />
      </button>
    </div>
  );
};

type ArrowButtonsProps = {
  className?: string;
};

export default ArrowButtons;

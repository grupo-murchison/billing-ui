import clsx from 'clsx';

import { Button } from '@app/components';

import { DeleteOutlineIcon } from '@assets/icons';

const DataGridDeleteButton = ({ className, ...props }: DataGridDeleteButtonProps) => {
  return (
    <Button color='primary' icon={<DeleteOutlineIcon />} outlined className={clsx(className)} {...props}>
      Eliminar
    </Button>
  );
};

type DataGridDeleteButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default DataGridDeleteButton;

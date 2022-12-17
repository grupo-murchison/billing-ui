import clsx from 'clsx';

import { Button } from '@app/components';

import { EditOutlinedIcon } from '@assets/icons';

const DataGridEditButton = ({ className, ...props }: DataGridEditButtonProps) => {
  return (
    <Button color='primary' icon={<EditOutlinedIcon />} outlined className={clsx(className)} {...props}>
      Editar
    </Button>
  );
};

type DataGridEditButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default DataGridEditButton;

import clsx from 'clsx';

import { Button } from '@app/components';

import { VisibilityOutlinedIcon } from '@assets/icons';

const DataGridViewButton = ({ className, ...props }: DataGridViewButtonProps) => {
  return (
    <Button color='primary' icon={<VisibilityOutlinedIcon />} outlined className={clsx(className)} {...props}>
      Ver
    </Button>
  );
};

type DataGridViewButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default DataGridViewButton;

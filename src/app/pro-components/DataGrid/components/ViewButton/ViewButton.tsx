import clsx from 'clsx';

import { Button } from '@app/components';

import { VisibilityOutlinedIcon } from '@assets/icons';

const ViewButton = ({ className, ...props }: ViewButtonProps) => {
  return (
    <Button color='primary' icon={<VisibilityOutlinedIcon />} outlined className={clsx(className)} {...props}>
      Ver
    </Button>
  );
};

type ViewButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default ViewButton;

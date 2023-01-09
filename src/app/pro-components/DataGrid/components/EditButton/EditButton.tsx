import clsx from 'clsx';

import { Button } from '@app/components';

import { EditOutlinedIcon } from '@assets/icons';

const EditButton = ({ className, ...props }: EditButtonProps) => {
  return (
    <Button color='primary' icon={<EditOutlinedIcon />} outlined className={clsx(className)} {...props}>
      Editar
    </Button>
  );
};

type EditButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default EditButton;

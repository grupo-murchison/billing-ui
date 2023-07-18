import clsx from 'clsx';

// import { Button as ButtonPaul } from '@app/components';

import { EditOutlinedIcon } from '@assets/icons';
import { Button, IconButton, useTheme } from '@mui/material';

// const EditButton = () => {
//   return (
//     <Button color='secondary'>
//       <EditOutlinedIcon />
//     </Button>
//   );
// };

// // const EditButtonPaul = ({ className, ...props }: EditButtonProps) => {
// //   return (
// //     <ButtonPaul color='primary' icon={<EditOutlinedIcon />} outlined className={clsx(className)} {...props}>
// //       Editar
// //     </ButtonPaul>
// //   );
// // };

export const EditIconButton = ({ ...props }) => {
  const theme = useTheme();
  return (
    <IconButton
      color='primary'
      aria-label='edit'
      {...props}
      sx={{
        ':hover': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          transition: 'ease-out',
          transitionDuration: '0.3s',
          // transitionDuration: theme.transitions.duration.standard,
        },
      }}
    >
      <EditOutlinedIcon />
    </IconButton>
  );
};

// type EditButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

// export default EditButton;

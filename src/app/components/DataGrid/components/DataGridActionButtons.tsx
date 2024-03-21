import { Stack } from '@mui/material';

function DataGridActionButtons({ handleClickEdit, handleClickDelete }: DataGridActionButtonsProps) {
  return (
    <Stack direction='row' justifyContent='center' spacing={1}>
      {/* <EditButton onClick={() => handleClickEdit(row)} />
      <DeleteButton onClick={() => handleClickDelete(row)} /> */}
    </Stack>
  );
}

export default DataGridActionButtons;

type DataGridActionButtonsProps = {
  handleClickEdit?: () => void;
  handleClickDelete?: () => void;
};

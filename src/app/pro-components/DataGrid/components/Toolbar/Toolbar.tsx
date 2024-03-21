import { useContext } from 'react';

import { SearchIcon, AddIcon, FilterAltIcon, DownloadIcon } from '@assets/icons';

import { DataGridContext } from '@app/pro-components/DataGrid/contexts';
import { ActionButton } from '@app/pro-components/DataGrid/components/Toolbar/components';

import { Stack, useTheme } from '@mui/material';

const Toolbar = ({ className }: ToolbarProps) => {
  const { onClickNew } = useContext(DataGridContext);
  const theme = useTheme();

  return (
    <Stack
      direction='row'
      justifyContent='flex-end'
      sx={{
        border: `1px solid ${theme.palette.secondary.main}`,
        borderBottom: '0px',
        backgroundColor: 'rgb(209, 216, 223)',
      }}
    >
      <ActionButton icon={<SearchIcon />} label='Buscar' />
      <ActionButton icon={<FilterAltIcon />} label='Filtrar' />
      <ActionButton colorPrimary icon={<AddIcon />} label='Alta' onClick={onClickNew} />
      <ActionButton colorPrimary icon={<DownloadIcon />} label='Exportar' />
    </Stack>
  );
};

type ToolbarProps = {
  className?: string;
};

export default Toolbar;

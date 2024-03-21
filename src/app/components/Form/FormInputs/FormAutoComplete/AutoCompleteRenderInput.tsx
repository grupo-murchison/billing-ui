import * as React from 'react';
import { AutocompleteRenderInputParams, FormControl, IconButton, InputLabel, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { ManageSearchIcon } from '@assets/icons';

type RenderInput = AutocompleteRenderInputParams & { label: string; loading: boolean; error: AnyValue };
interface AdvancedSearchRenderInput extends RenderInput {
  onClickOpen?: () => void;
}

const AutocompleteRenderInput = ({ label, loading, error, ...params }: RenderInput) => (
  <FormControl fullWidth error={!!error}>
    <InputLabel htmlFor='custom-textfield' sx={{ position: 'absolute', top: 0, left: -14 }}>
      {label}
    </InputLabel>

    <TextField
      {...params}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <React.Fragment>
            {loading ? <CircularProgress size={20} /> : null}
            {params.InputProps.endAdornment}
          </React.Fragment>
        ),
      }}
      error={!!error}
      helperText={error?.message}
      sx={{ marginTop: '3.25rem' }}
    />
  </FormControl>
);

const AutocompleteAdvancedSearchRenderInput = ({
  label,
  loading,
  error,
  onClickOpen,
  ...params
}: AdvancedSearchRenderInput) => (
  <FormControl fullWidth error={!!error}>
    <InputLabel htmlFor='custom-textfield' sx={{ position: 'absolute', top: 0, left: -14 }}>
      {label}
    </InputLabel>

    <TextField
      {...params}
      InputProps={{
        ...params.InputProps,
        startAdornment: (
          <IconButton onClick={onClickOpen} size='small' sx={{py: 0.4}}>
            <ManageSearchIcon fontSize='inherit' />
          </IconButton>
        ),
        endAdornment: (
          <React.Fragment>
            {loading ? <CircularProgress size={20} /> : null}
            {params.InputProps.endAdornment}
          </React.Fragment>
        ),
      }}
      error={!!error}
      helperText={error?.message}
      sx={{ marginTop: '3.25rem' }}
    />
  </FormControl>
);

export default AutocompleteRenderInput;

export { AutocompleteAdvancedSearchRenderInput };

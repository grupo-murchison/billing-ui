import * as React from 'react';
import { AutocompleteRenderInputParams, IconButton, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { SearchIcon } from '@assets/icons';

type RenderInput = AutocompleteRenderInputParams & { label: string; loading: boolean; error: AnyValue };
interface AdvancedSearchRenderInput extends RenderInput {
  onClickOpen?: () => void;
}

const AutocompleteRenderInput = ({ label, loading, error, ...params }: RenderInput) => (
  <TextField
    {...params}
    label={label}
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
  />
);

const AutocompleteAdvancedSearchRenderInput = ({
  label,
  loading,
  error,
  onClickOpen,
  ...params
}: AdvancedSearchRenderInput) => (
  <TextField
    {...params}
    label={label}
    InputProps={{
      ...params.InputProps,
      startAdornment: (
        <IconButton onClick={onClickOpen}>
          <SearchIcon />
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
  />
);

export default AutocompleteRenderInput;

export { AutocompleteAdvancedSearchRenderInput };

import * as React from 'react';
import { AutocompleteRenderInputParams, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

type RenderInput = AutocompleteRenderInputParams & { label: string; loading: boolean, error: AnyValue };

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

export default AutocompleteRenderInput;

import * as React from 'react';
import { AutocompleteRenderInputParams, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

type RenderInput = AutocompleteRenderInputParams & { label: string; loading: boolean };

const AutocompleteRenderInput = ({ label, loading, ...params }: RenderInput) => (
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
  />
);

export default AutocompleteRenderInput;

import * as React from 'react';
import { Control, Controller } from 'react-hook-form';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { FormInputsCommonProps } from '../../form.interfaces';
import { DropdownItemType, DropdownSchemaType } from '@app/utils/zod.util';
import AutocompleteRenderInput from './AutoCompleteRenderInput';
import { AxiosResponse } from 'axios';

export default function AsyncAutocomplete({
  options: optionsProps,
  control,
  name,
  label,
  error,
  repositoryFunc,
  ...props
}: FormAsyncAutocomplete<DropdownItemType>) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<DropdownSchemaType>([]);
  const [value, setValue] = React.useState<DropdownItemType>({ code: '', label: '', value: '' });
  const [inputValue, setInputValue] = React.useState('');
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const params = {
        filter: inputValue ? inputValue : '*',
      };

      repositoryFunc({ ...params })
        .then(({ data }) => {
          if (active) {
            setOptions(data);
            // setOptions([...optionsProps]);
          }
        })
        .catch(() => {
          setOptions([]);
        });
    })();

    return () => {
      active = false;
    };
  }, [loading, inputValue]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...props}
          {...field}
          // getOptionLabel={option => (typeof option === 'string' ? option : option.label)}
          // Add this prop to help with identifying the selected option
          // getOptionLabel={(option: any) => option.title}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          loading={loading}
          loadingText='Cargando...'
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          onChange={(event: AnyValue, newValue) => {
            // setOptions(newValue ? [newValue, ...options] : options);
            // setValue(newValue);

            // Actually change the state of react-hook-forms
            field.onChange(newValue);
            // setValue(newValue);
          }}
          open={open}
          options={options}
          // renderOption={(option) => <span>{option.label}</span>}
          renderInput={params => <AutocompleteRenderInput {...params} label={label} loading={loading} error={error} />}
          // value={value}
        />
      )}
    />
  );
}

export interface FormAsyncAutocomplete<T> extends FormInputsCommonProps {
  control: Control<AnyValue>;
  options?: AnyValue[];
  repositoryFunc: (params?: Partial<Record<string, unknown>>) => Promise<AxiosResponse<T[]>>;
}

import * as React from 'react';
import { Control, Controller } from 'react-hook-form';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { FormInputsCommonProps } from '../../form.interfaces';
import { DropdownItemType, DropdownSchemaType } from '@app/utils/zod.util';
import { AutocompleteAdvancedSearchRenderInput } from './AutoCompleteRenderInput';
import { AxiosResponse } from 'axios';
import { Box } from '@mui/material';
import { Modal } from '@app/components/Modal';
import ClienteAdvancedSearch from '@domains/cliente/container/cliente-dropdown/ClienteAdvancedSearch';

export default function FormPopUp({
  options: optionsProps,
  control,
  name,
  label,
  repositoryFunc,
  resetField,
  ...props
}: FormAsyncAutocomplete<DropdownItemType>) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<DropdownSchemaType>([]);
  const [inputValue, setInputValue] = React.useState('');
  const loading = open && options.length === 0;

  const [openModal, setOpenModal] = React.useState(false);

  const activarModal = () => {
    setOpenModal(true);
  };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const params = {
        filter: inputValue ? inputValue : '*',
      };

      if (optionsProps) {
        setOptions([...optionsProps]);
      } else {
        repositoryFunc({ ...params })
          .then(({ data }) => {
            if (active) {
              setOptions(data);
            }
          })
          .catch(() => {
            setOptions([]);
          });
      }
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
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Box>
            <Autocomplete
              {...props}
              {...field}
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
                field.onChange(newValue);
              }}
              open={open}
              options={options}
              renderInput={params => (
                <AutocompleteAdvancedSearchRenderInput
                  {...params}
                  label={label}
                  loading={loading}
                  error={error}
                  onClickOpen={activarModal}
                />
              )}
            />
          </Box>
        )}
      />

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title='Búsqueda amplia Clientes'>
        <ClienteAdvancedSearch
          setInputValue={setInputValue}
          setOpenModal={setOpenModal}
          setOptions={setOptions}
          resetField={resetField}
          name={name}
        />
      </Modal>
    </>
  );
}

export interface FormAsyncAutocomplete<T> extends FormInputsCommonProps {
  control: Control<AnyValue>;
  options?: AnyValue[];
  repositoryFunc: (params?: Partial<Record<string, unknown>>) => Promise<AxiosResponse<T[]>>;
  //TODO buscar tipado resetField
  resetField: AnyValue;
}

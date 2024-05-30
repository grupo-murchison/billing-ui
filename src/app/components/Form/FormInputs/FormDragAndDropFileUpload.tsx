import { Control, Controller } from 'react-hook-form';
import { DragDropFileUploadProps } from '../form.interfaces';
import DragDropFileUpload from '@app/components/FileUpload/DragDropFileUpload';

function FormDragAndDropFileUpload({ control, name, accept, ...props }: FormDragAndDropFileUploadProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: 'Este campo es requerido' }}
      render={({ field }) => (
        <DragDropFileUpload
          name={field.name}
          onChange={(file: FileList | null) => {
            if (file) {
              if (props?.multiple) {
                field.onChange(file);
              } else {
                field.onChange(file[0]);
              }
            } else {
              field.onChange(null);
            }
          }}
          accept={accept}
          disabled={false}
          loading={false}
        />
      )}
    />
  );
}

interface FormDragAndDropFileUploadProps extends Omit<DragDropFileUploadProps, 'onChange' | 'loading'> {
  control: Control<AnyValue>;
}

export default FormDragAndDropFileUpload;

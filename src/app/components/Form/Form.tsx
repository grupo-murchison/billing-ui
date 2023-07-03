import FormActionButtons from './FormActionButtons';
import { FromProps } from './form.interfaces';

const Form = ({ children, isSubmitting, onSubmit, handleClose, isUpdate }: FromProps) => {
  return (
    <form noValidate onSubmit={onSubmit} autoComplete='off'>
      <>{children}</>
      <FormActionButtons isSubmitting={isSubmitting} isUpdate={isUpdate} handleClose={handleClose} />
    </form>
  );
};

export default Form;

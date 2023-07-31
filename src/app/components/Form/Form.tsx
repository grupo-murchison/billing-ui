import FormActionButtons from './FormActionButtons';
import { FromProps } from './form.interfaces';

const Form = ({ children, onSubmit, ...props }: FromProps) => {
  return (
    <form noValidate onSubmit={onSubmit} autoComplete='off'>
      <>{children}</>
      <FormActionButtons {...props} />
    </form>
  );
};

export default Form;

import React from 'react';
import FormActionButtons from './FormActionButtons';
import { FromProps } from './form.interfaces';

const Form = ({ children, onSubmit, ...props }: FromProps) => {
  const listener = React.useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      onSubmit && onSubmit();
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [listener]);

  return (
    <form noValidate onSubmit={onSubmit} autoComplete='off'>
      <>{children}</>
      <FormActionButtons {...props} />
    </form>
  );
};

export default Form;

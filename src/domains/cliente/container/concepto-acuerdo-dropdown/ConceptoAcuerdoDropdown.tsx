
import { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';
import { FormAutocomplete } from '@app/components/Form/FormInputs/FormAutoComplete';
import { ConceptoAcuerdoRepository } from '@domains/concepto-acuerdo/repository';

const ConcepoAcuerdoAutoComplete = ({ ...props }: ConceptoAcuerdoDropdownProps) => {
  return <FormAutocomplete {...props} repositoryFunc={ConceptoAcuerdoRepository.getAllConceptoAcuerdoAsDropdownAutoComplete} />;
};

interface ConceptoAcuerdoDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export { ConcepoAcuerdoAutoComplete };

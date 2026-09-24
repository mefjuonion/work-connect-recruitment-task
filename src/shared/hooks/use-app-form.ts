import { createFormHook } from '@tanstack/react-form';

import {
  CheckboxField,
  CheckboxGroupField,
  NumberField,
  SelectField,
  SwitchField,
  TextareaField,
  TextField,
} from '@/shared/ui/form-fields';

import { fieldContext, formContext } from '../lib/form-context';

export const { useAppForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextareaField,
    NumberField,
    SelectField,
    CheckboxField,
    SwitchField,
    CheckboxGroupField,
  },
  formComponents: {},
});

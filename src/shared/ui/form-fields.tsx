import type { ComponentProps } from 'react';

import { useFieldContext } from '@/shared/lib/form-context';
import { Badge } from '@/shared/ui/badge';
import { Checkbox } from '@/shared/ui/checkbox';
import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Switch } from '@/shared/ui/switch';
import { Textarea } from '@/shared/ui/textarea';

type Option<TValue> = {
  value: TValue;
  label: string;
};

type InputProps = Omit<
  ComponentProps<'input'>,
  'id' | 'value' | 'onChange' | 'onBlur'
>;

type LabelProps = {
  label: string;
};

function useFieldErrors() {
  const field = useFieldContext<unknown>();
  const { errors } = field.state.meta;

  return { errors, isInvalid: errors.length > 0 };
}

export function TextField({ label, ...props }: LabelProps & InputProps) {
  const field = useFieldContext<string>();
  const { errors, isInvalid } = useFieldErrors();

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        {...props}
        id={field.name}
        value={field.state.value}
        aria-invalid={isInvalid}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
      />
      <FieldError errors={errors} />
    </Field>
  );
}

export function TextareaField({
  label,
  placeholder,
}: LabelProps & { placeholder?: string }) {
  const field = useFieldContext<string>();
  const { errors, isInvalid } = useFieldErrors();

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Textarea
        id={field.name}
        className="resize-none"
        placeholder={placeholder}
        value={field.state.value}
        aria-invalid={isInvalid}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
      />
      <FieldError errors={errors} />
    </Field>
  );
}

type NumberFieldProps = LabelProps &
  InputProps & {
    /** An empty input becomes `null` instead of `NaN`. */
    nullable?: boolean;
  };

export function NumberField({ label, nullable, ...props }: NumberFieldProps) {
  const field = useFieldContext<number | null>();
  const { errors, isInvalid } = useFieldErrors();
  const { value } = field.state;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        inputMode="decimal"
        {...props}
        id={field.name}
        type="number"
        value={value === null || Number.isNaN(value) ? '' : value}
        aria-invalid={isInvalid}
        onBlur={field.handleBlur}
        onChange={(event) =>
          field.handleChange(
            nullable && event.target.value === ''
              ? null
              : event.target.valueAsNumber
          )
        }
      />
      <FieldError errors={errors} />
    </Field>
  );
}

type SelectFieldProps<TValue extends string | number> = LabelProps & {
  options: readonly Option<TValue>[];
  placeholder?: string;
};

export function SelectField<TValue extends string | number>({
  label,
  options,
  placeholder,
}: SelectFieldProps<TValue>) {
  const field = useFieldContext<TValue | ''>();
  const { errors, isInvalid } = useFieldErrors();

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Select
        value={String(field.state.value)}
        onValueChange={(value) => {
          const option = options.find((item) => String(item.value) === value);
          if (option) field.handleChange(option.value);
        }}
        onOpenChange={(open) => !open && field.handleBlur()}
      >
        <SelectTrigger
          id={field.name}
          className="w-full"
          aria-invalid={isInvalid}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError errors={errors} />
    </Field>
  );
}

export function CheckboxField({ label }: LabelProps) {
  const field = useFieldContext<boolean>();

  return (
    <Field orientation="horizontal">
      <Checkbox
        id={field.name}
        checked={field.state.value}
        onBlur={field.handleBlur}
        onCheckedChange={(checked) => field.handleChange(checked === true)}
      />
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
    </Field>
  );
}

export function SwitchField({ label }: LabelProps) {
  const field = useFieldContext<boolean>();

  return (
    <Field orientation="horizontal">
      <Switch
        id={field.name}
        checked={field.state.value}
        onBlur={field.handleBlur}
        onCheckedChange={field.handleChange}
      />
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
    </Field>
  );
}

type CheckboxGroupFieldProps<TValue extends string> = LabelProps & {
  options: readonly Option<TValue>[];
};

/** Checkboxes rendered as outline badges: the input is visually hidden and the badge is its label. */
export function CheckboxGroupField<TValue extends string>({
  label,
  options,
}: CheckboxGroupFieldProps<TValue>) {
  const field = useFieldContext<TValue[]>();
  const { errors, isInvalid } = useFieldErrors();

  const toggle = (value: TValue, checked: boolean) =>
    field.handleChange(
      checked
        ? [...field.state.value, value]
        : field.state.value.filter((item) => item !== value)
    );

  return (
    <FieldSet data-invalid={isInvalid} className="gap-3">
      <FieldLegend variant="label">{label}</FieldLegend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const id = `${field.name}-${option.value}`;

          return (
            <div key={option.value}>
              <input
                id={id}
                type="checkbox"
                className="peer sr-only"
                checked={field.state.value.includes(option.value)}
                aria-invalid={isInvalid}
                onBlur={field.handleBlur}
                onChange={(event) => toggle(option.value, event.target.checked)}
              />
              <Badge variant="outline" asChild>
                <label
                  htmlFor={id}
                  className="cursor-pointer text-muted-foreground peer-checked:bg-primary peer-checked:text-white peer-checked:border-0 peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50 peer-aria-invalid:border-destructive"
                >
                  {option.label}
                </label>
              </Badge>
            </div>
          );
        })}
      </div>
      <FieldError errors={errors} />
    </FieldSet>
  );
}

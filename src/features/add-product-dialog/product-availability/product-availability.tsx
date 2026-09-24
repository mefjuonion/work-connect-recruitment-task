import COPY from '@/shared/copy/product-availability';
import { withFieldGroup } from '@/shared/hooks/use-app-form';
import { Checkbox } from '@/shared/ui/checkbox';
import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { Separator } from '@/shared/ui/separator';
import { Switch } from '@/shared/ui/switch';

import { productAvailabilityDefaultValues } from '../schema/product-availability';

const toNumberOrNull = (value: string) => (value === '' ? null : Number(value));

const ProductAvailability = withFieldGroup({
  defaultValues: productAvailabilityDefaultValues,
  render: function Render({ group }) {
    return (
      <div className="flex flex-col gap-4">
        <group.Field name="isAvailable">
          {(field) => (
            <Field orientation="horizontal">
              <Switch
                id={field.name}
                checked={field.state.value}
                onCheckedChange={field.handleChange}
                onBlur={field.handleBlur}
              />
              <FieldLabel htmlFor={field.name}>
                {COPY.fields.isAvailable.label}
              </FieldLabel>
            </Field>
          )}
        </group.Field>

        <Separator />

        <div className="flex flex-col gap-4">
          <group.Field name="isLimited">
            {(field) => (
              <Field orientation="horizontal">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) =>
                    field.handleChange(checked === true)
                  }
                  onBlur={field.handleBlur}
                />
                <FieldLabel htmlFor={field.name}>
                  {COPY.fields.isLimited.label}
                </FieldLabel>
              </Field>
            )}
          </group.Field>

          <Separator />

          <group.Subscribe selector={(state) => state.values.isLimited}>
            {(isLimited) =>
              isLimited && (
                <group.Field name="stock">
                  {(field) => {
                    const { errors } = field.state.meta;

                    return (
                      <Field data-invalid={errors.length > 0}>
                        <FieldLabel htmlFor={field.name}>
                          {COPY.fields.stock.label}
                        </FieldLabel>
                        <Input
                          id={field.name}
                          type="number"
                          inputMode="numeric"
                          placeholder={COPY.fields.stock.placeholder}
                          min={0}
                          step={1}
                          value={field.state.value ?? ''}
                          aria-invalid={errors.length > 0}
                          onBlur={field.handleBlur}
                          onChange={(event) =>
                            field.handleChange(
                              toNumberOrNull(event.target.value)
                            )
                          }
                        />
                        <FieldError errors={errors} />
                      </Field>
                    );
                  }}
                </group.Field>
              )
            }
          </group.Subscribe>
        </div>

        <FieldSet className="gap-4 py-1">
          <FieldLegend className="mb-4 text-base font-medium">
            {COPY.fields.cartLimits.label}
          </FieldLegend>
          <div className="grid gap-4 sm:grid-cols-2">
            {(['minPerCart', 'maxPerCart'] as const).map((name) => (
              <group.Field key={name} name={name}>
                {(field) => {
                  const { errors } = field.state.meta;

                  return (
                    <Field data-invalid={errors.length > 0}>
                      <FieldLabel htmlFor={field.name}>
                        {COPY.fields[name].label}
                      </FieldLabel>
                      <Input
                        id={field.name}
                        type="number"
                        inputMode="numeric"
                        placeholder={COPY.fields[name].placeholder}
                        min={1}
                        step={1}
                        value={
                          Number.isNaN(field.state.value)
                            ? ''
                            : field.state.value
                        }
                        aria-invalid={errors.length > 0}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.valueAsNumber)
                        }
                      />
                      <FieldError errors={errors} />
                    </Field>
                  );
                }}
              </group.Field>
            ))}
          </div>
        </FieldSet>
      </div>
    );
  },
});

export default ProductAvailability;

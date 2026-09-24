import COPY from '@/shared/copy/product-base-info';
import { withFieldGroup } from '@/shared/hooks/use-app-form';
import { productBaseInfoDefaultValues } from '@/shared/schemas/product-base-info';

import { CATEGORY_OPTIONS, FEATURE_OPTIONS, MANUFACTURER_OPTIONS } from './product-base-info.utils';

const ProductBaseInfo = withFieldGroup({
  defaultValues: productBaseInfoDefaultValues,
  render: function Render({ group }) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <group.AppField name="name">
            {(field) => <field.TextField
              label={COPY.fields.name.label}
              placeholder={COPY.fields.name.placeholder}
            />}
          </group.AppField>
          <group.AppField name="sku">
            {(field) => <field.TextField
              label={COPY.fields.sku.label}
              placeholder={COPY.fields.sku.placeholder}
            />}
          </group.AppField>
        </div>

        <group.AppField name="description">
          {(field) => <field.TextareaField
            label={COPY.fields.description.label}
            placeholder={COPY.fields.description.placeholder}
          />}
        </group.AppField>

        <div className="grid gap-4 sm:grid-cols-2">
          <group.AppField name="manufacturer">
            {(field) => (
              <field.SelectField
                label={COPY.fields.manufacturer.label}
                placeholder={COPY.fields.manufacturer.placeholder}
                options={MANUFACTURER_OPTIONS}
              />
            )}
          </group.AppField>
          <group.AppField name="category">
            {(field) => (
              <field.SelectField
                label={COPY.fields.category.label}
                placeholder={COPY.fields.category.placeholder}
                options={CATEGORY_OPTIONS}
              />
            )}
          </group.AppField>
        </div>

        <group.AppField name="features">
          {(field) => (
            <field.CheckboxGroupField
              label={COPY.fields.features.label}
              options={FEATURE_OPTIONS}
            />
          )}
        </group.AppField>
      </div>
    );
  },
});

export default ProductBaseInfo;

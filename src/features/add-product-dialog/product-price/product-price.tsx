import COPY from '@/shared/copy/product-price';
import { withFieldGroup } from '@/shared/hooks/use-app-form';
import {
  calculateGrossPrice,
  calculateNetPrice,
} from '@/shared/lib/currencyUtils';

import { productPriceDefaultValues } from '../schema/product-price';
import * as UTILS from './product-price.utils';

const ProductPrice = withFieldGroup({
  defaultValues: productPriceDefaultValues,
  render: function Render({ group }) {
    const updateGrossPrice = () => {
      const { netPrice, vatRate } = group.state.values;
      if (Number.isFinite(netPrice)) {
        group.setFieldValue('grossPrice', calculateGrossPrice(netPrice, vatRate), {
          dontRunListeners: true,
        });
      }
    };

    const updateNetPrice = () => {
      const { grossPrice, vatRate } = group.state.values;
      if (Number.isFinite(grossPrice)) {
        group.setFieldValue('netPrice', calculateNetPrice(grossPrice, vatRate), {
          dontRunListeners: true,
        });
      }
    };

    return (
      <div className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <group.AppField
            name="netPrice"
            listeners={{ onChange: updateGrossPrice }}
          >
            {(field) => (
              <field.NumberField
                label={COPY.fields.netPrice.label}
                placeholder={COPY.fields.netPrice.placeholder}
                min={0}
                step={0.01}
              />
            )}
          </group.AppField>
          <group.AppField
            name="grossPrice"
            listeners={{ onChange: updateNetPrice }}
          >
            {(field) => (
              <field.NumberField
                label={COPY.fields.grossPrice.label}
                placeholder={COPY.fields.grossPrice.placeholder}
                min={0}
                step={0.01}
              />
            )}
          </group.AppField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <group.AppField
            name="vatRate"
            listeners={{ onChange: updateGrossPrice }}
          >
            {(field) => (
              <field.SelectField
                label={COPY.fields.vatRate.label}
                placeholder={COPY.fields.vatRate.placeholder}
                options={UTILS.VAT_OPTIONS}
              />
            )}
          </group.AppField>
          <group.AppField name="currency">
            {(field) => (
              <field.SelectField
                label={COPY.fields.currency.label}
                placeholder={COPY.fields.currency.placeholder}
                options={UTILS.CURRENCY_OPTIONS}
              />
            )}
          </group.AppField>
        </div>
      </div>
    );
  },
});

export default ProductPrice;

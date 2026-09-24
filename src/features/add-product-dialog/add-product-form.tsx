'use client';

import { useSelector } from '@tanstack/react-form';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { useQueryStates } from 'nuqs';
import { ComponentProps, useEffect, useState } from 'react';
import { toast } from 'sonner';

import COPY from '@/shared/copy/add-product-dialog';
import { useAppForm } from '@/shared/hooks/use-app-form';
import { cn } from '@/shared/lib/utils';
import { useProductsStore } from '@/shared/stores/products-store';
import { Button } from '@/shared/ui/button';
import { DialogFooter } from '@/shared/ui/dialog';
import QueriedStepper, { useStepQuery } from '@/shared/ui/queried-stepper';
import { Separator } from '@/shared/ui/separator';

import {
  ADD_PRODUCT_FORM_STEPS,
  ADD_PRODUCT_STEPPER_STEPS,
  addProductFormSchema,
  findFirstInvalidStep,
} from './add-product-dialog-steps';
import {
  ADD_PRODUCT_STEP_URL_KEY,
  addProductFormSearchParams,
  addProductFormUrlKeys,
  formValuesToQuery,
  queryToFormValues,
} from './add-product-form.search-params';
import ProductAvailability from './product-availability/product-availability';
import ProductBaseInfo from './product-base-info/product-base-info';
import ProductPrice from './product-price/product-price';

interface AddProductFormProps extends ComponentProps<'form'> {
  onSuccess?: () => void;
};

const AddProductForm = ({ onSuccess, className, ...rest }: AddProductFormProps) => {
  const [query, setQuery] = useQueryStates(addProductFormSearchParams, {
    history: 'replace',
    urlKeys: addProductFormUrlKeys,
  });
  const { currentIndex, setIndex, setStep } = useStepQuery(
    ADD_PRODUCT_FORM_STEPS.length,
    ADD_PRODUCT_STEP_URL_KEY
  );
  const isLastStep = currentIndex === ADD_PRODUCT_FORM_STEPS.length - 1;

  const addProduct = useProductsStore((state) => state.addProduct);

  const [initialValues] = useState(() => queryToFormValues(query));

  const form = useAppForm({
    defaultValues: initialValues,
    validators: { onSubmit: ADD_PRODUCT_FORM_STEPS[currentIndex] },
    onSubmit: ({ value }) => {
      if (!isLastStep) return setStep(currentIndex + 1);

      const firstInvalid = findFirstInvalidStep(value);
      if (firstInvalid !== null) return setStep(firstInvalid);

      const { baseInfo, price, availability } = addProductFormSchema.parse(value);
      addProduct({ ...baseInfo, ...price, ...availability });
      onSuccess?.();

      toast.success(COPY.responseSuccess);
    },
  });

  const values = useSelector(form.store, (state) => state.values);

  useEffect(() => {
    void setQuery(formValuesToQuery(values));
  }, [values, setQuery]);

  useEffect(() => {
    const firstInvalid = findFirstInvalidStep(form.state.values, currentIndex);
    if (firstInvalid !== null) void setIndex(firstInvalid, { history: 'replace' });
  }, [currentIndex, form, setIndex]);

  return (
    <form
      noValidate
      className={cn(className, 'flex min-h-0 flex-1 flex-col')}
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit();
      }}
      {...rest}
    >
      <div className="shrink-0 py-6 md:px-4">
        <QueriedStepper
          steps={ADD_PRODUCT_STEPPER_STEPS}
          queryKey={ADD_PRODUCT_STEP_URL_KEY}
        />
      </div>
      <Separator />

      <div className="-mx-1 min-h-0 flex-1 overflow-y-auto px-1 py-4 md:mx-0 md:px-4">
        {currentIndex === 0 && <ProductBaseInfo form={form} fields="baseInfo" />}
        {currentIndex === 1 && <ProductPrice form={form} fields="price" />}
        {currentIndex === 2 && (
          <ProductAvailability form={form} fields="availability" />
        )}
      </div>

      <DialogFooter className="-mx-4 shrink-0 rounded-none px-4 md:mx-0 md:rounded-b-xl">
        <Button
          type="button"
          variant="outline"
          className="disabled:invisible"
          disabled={currentIndex === 0}
          onClick={() => setStep(currentIndex - 1)}
        >
          <ArrowLeftIcon />
          {COPY.buttonBack}
        </Button>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
            >
              {isLastStep ? COPY.buttonSubmit : COPY.buttonNext}
              {!isLastStep && <ArrowRightIcon />}
            </Button>
          )}
        </form.Subscribe>
      </DialogFooter>
    </form>
  );
};

export default AddProductForm;

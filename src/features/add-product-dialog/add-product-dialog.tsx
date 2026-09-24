'use client';

import { parseAsBoolean, parseAsIndex, useQueryStates } from 'nuqs';

import COPY from '@/shared/copy/add-product-dialog';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Separator } from '@/shared/ui/separator';

import AddProductForm from './add-product-form';
import {
  addProductFormSearchParams,
  prefixUrlKeys,
} from './add-product-form.search-params';

const dialogSearchParams = {
  open: parseAsBoolean.withDefault(false),
  step: parseAsIndex,
  ...addProductFormSearchParams,
};

const dialogUrlKeys = prefixUrlKeys(dialogSearchParams);

const AddProductDialog = () => {
  const [{ open }, setQuery] = useQueryStates(dialogSearchParams, {
    urlKeys: dialogUrlKeys,
  });

  const handleOpenChange = (isOpen: boolean) =>
    setQuery(isOpen ? { open: true } : null);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          // < md: fullscreen sheet
          'inset-0 flex h-dvh max-w-none translate-x-0 translate-y-0 flex-col rounded-none sm:max-w-none px-4 pt-6 pb-0',
          // ≥ md: centered dialog
          'md:inset-auto md:top-1/2 md:left-1/2 md:h-auto md:max-h-[calc(100dvh-2rem)] md:max-w-155 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:p-0'
        )}
      >
        <DialogHeader>
          <DialogTitle>{COPY.header}</DialogTitle>
        </DialogHeader>

        <Separator />

        <AddProductForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;

'use client';

import { parseAsBoolean, parseAsIndex, useQueryStates } from 'nuqs';

import COPY from '@/shared/copy/add-product-dialog';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';

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

      <DialogContent className="sm:max-w-155">
        <DialogHeader>
          <DialogTitle>{COPY.header}</DialogTitle>
        </DialogHeader>

        <AddProductForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;

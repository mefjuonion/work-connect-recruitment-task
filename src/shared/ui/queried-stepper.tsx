'use client';

import { parseAsIndex, useQueryState } from 'nuqs';

import Stepper, { type StepperProps } from './stepper';

const DEFAULT_QUERY_KEY = 'step';

export function useStepQuery(stepsCount: number, queryKey = DEFAULT_QUERY_KEY) {
  const [index, setIndex] = useQueryState(queryKey, parseAsIndex);

  const lastIndex = Math.max(0, stepsCount - 1);
  const currentIndex = Math.min(Math.max(0, index ?? 0), lastIndex);

  const setStep = (target: number) => {
    if (target >= 0 && target <= lastIndex) void setIndex(target);
  };

  return { currentIndex, setIndex, setStep };
}

export type QueriedStepperProps = Omit<
  StepperProps,
  'currentStep'
> & {
  queryKey?: string;
};

const QueriedStepper = ({ steps, queryKey }: QueriedStepperProps) => {
  const { currentIndex } = useStepQuery(steps.length, queryKey);

  return (
    <Stepper
      steps={steps}
      currentStep={steps[currentIndex]}
    />
  );
};

export default QueriedStepper;

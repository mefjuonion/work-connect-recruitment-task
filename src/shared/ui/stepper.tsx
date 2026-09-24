import { Fragment } from "react";
import { cn } from "../lib/utils";
import { Check } from "lucide-react";
import { Avatar, AvatarFallback } from "./avatar";
import { Separator } from "./separator";

export type StepperStep = {
  title: string;
  subtitle: string;
}

export type StepperProps = {
  steps: StepperStep[];
  currentStep: StepperStep;
}

const Stepper = (props: StepperProps) => {
  const currentIndex = props.steps.indexOf(props.currentStep);

  return (
    <div className="flex w-full items-center">
      {props.steps.map((step, stepIndex) => (
        <Fragment key={step.title + stepIndex}>
          {stepIndex > 0 && (
            <Separator
              className={cn(
                "mx-4 hidden flex-1 md:block",
                currentIndex >= stepIndex && "bg-primary"
              )}
            />
          )}
          <div
            aria-current={step === props.currentStep ? "step" : undefined}
            className="flex min-w-0 flex-1 flex-col items-start gap-2 md:flex-none md:shrink-0 md:flex-row md:items-center md:gap-3"
          >
            <Avatar className="size-8">
              <AvatarFallback className={cn(
                "text-sm font-semibold",
                currentIndex >= stepIndex
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}>
                {stepIndex < currentIndex ? <Check className="size-4" /> : 
                  `${stepIndex + 1}`}
              </AvatarFallback>
            </Avatar>
            <div
              className="text-left md:whitespace-nowrap"
            >
              <p className={cn(
                "text-sm font-medium",
                currentIndex >= stepIndex
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}>
                {step.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {step.subtitle}
              </p>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  )
}

export default Stepper;
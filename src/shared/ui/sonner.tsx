"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        // Filled circle: the circle is painted with `fill`, the stroke draws the tick in white.
        success: (
          <CircleCheckIcon className="size-5 fill-success text-white" />
        ),
        info: (
          <InfoIcon className="size-5" />
        ),
        warning: (
          <TriangleAlertIcon className="size-5" />
        ),
        error: (
          <OctagonXIcon className="size-5" />
        ),
        loading: (
          <Loader2Icon className="size-5 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius-xl)",
        } as React.CSSProperties
      }
      toastOptions={{
        // Sonner styles these via [data-sonner-toast] attribute selectors, hence `!`.
        classNames: {
          toast: "cn-toast gap-2.5! px-4! py-3.5! text-sm! shadow-md!",
          icon: "size-5!",
          title: "font-medium!",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

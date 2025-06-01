'use client'

import * as Toast from '@radix-ui/react-toast'
import { tv, type VariantProps } from 'tailwind-variants'

const toast = tv({
  base: 'data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:slide-out-to-right-4 rounded-md shadow-lg p-4 w-[360px] border transition-all durantion-300 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-right-4',

  variants: {
    variant: {
      success: 'bg-green-100 border-green-500 text-green-800',
      error: 'bg-red-100 border-red-500 text-red-800',
      info: 'bg-zinc-900 border-y-zinc-600 text-lg',
    },
  },

  defaultVariants: {
    variant: 'info',
  },
})

type ToastVariants = VariantProps<typeof toast>

interface CustomToastProps extends Toast.ToastProps, ToastVariants {
  title: string
  description?: string
}

export function CustomToast({
  variant = 'info',
  title,
  description,
  ...props
}: CustomToastProps) {
  return (
    <Toast.Root {...props} className={toast({ variant })}>
      <Toast.Title className="text-lg font-bold">{title}</Toast.Title>
      {description && (
        <Toast.Description className="mt-1 text-sm">
          {description}
        </Toast.Description>
      )}
    </Toast.Root>
  )
}

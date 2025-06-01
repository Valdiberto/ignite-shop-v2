'use client'

import { CustomToast } from '@/components/ui/toast'
import * as Toast from '@radix-ui/react-toast'
import { createContext, useContext, useState, ReactNode } from 'react'

import type { VariantProps } from 'tailwind-variants'

type ToastVariants = VariantProps<typeof CustomToast>

interface ToastData {
  title: string
  description?: string
  variant?: ToastVariants['variant']
}

interface ToastContextType {
  addToast: (data: ToastData) => void
}

const ToastContext = createContext<ToastContextType>({} as ToastContextType)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [toastData, setToastData] = useState<ToastData>({
    title: '',
    description: '',
    variant: 'info',
  })

  function addToast(data: ToastData) {
    setToastData(data)
    setOpen(false)
    setTimeout(() => setOpen(true), 50)
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      <Toast.Provider swipeDirection="right" duration={3000}>
        {children}

        <CustomToast
          open={open}
          onOpenChange={setOpen}
          title={toastData.title}
          description={toastData.description}
          variant={toastData.variant}
        />
        <Toast.Viewport className="fixed top-4 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 lg:top-auto lg:right-4 lg:bottom-4 lg:left-auto lg:translate-x-0" />
      </Toast.Provider>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}

'use client'

import { useCart } from '@/hooks/use-cart'
import { HandbagIcon } from '@phosphor-icons/react/dist/ssr'
import { twMerge } from 'tailwind-merge'

import { XIcon } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import { useToast } from '@/context/toast-provider'

export function Cart() {
  const { addToast } = useToast()
  const [open, setOpen] = useState(false)
  const { cartItems, removeCartItem } = useCart()
  const cartQuantity = cartItems.length

  const totalItemsPrice = cartItems.reduce((acc, item) => {
    const numericPrice = Number(item.price.replace(/\D/g, '')) / 100
    return acc + numericPrice * item.quantity
  }, 0)

  const formattedCartTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalItemsPrice)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        products: cartItems,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      console.error(err)
      addToast({
        title: 'Erro ao iniciar o checkout!',
        variant: 'error',
      })
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="relative cursor-pointer rounded-md bg-zinc-800 p-3">
          <HandbagIcon
            className={twMerge(
              'text-zinc-400',
              cartQuantity > 0 && 'text-zinc-100',
            )}
            size={24}
            weight="duotone"
          />
          {cartQuantity === 0 ? (
            <div></div>
          ) : (
            <div className="absolute top-[calc(-0.5rem/2)] right-[calc(-1.0rem/2)] flex h-6 w-6 items-center justify-center rounded-full bg-emerald-700 outline-3 outline-[#121214]">
              <span className="text-sm font-bold text-gray-100">
                {cartQuantity}
              </span>
            </div>
          )}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content
          className={twMerge(
            'fixed top-0 right-0 bottom-0 flex w-94 flex-col bg-zinc-900 p-6 pt-18 shadow-[-4px_0_30px_rgba(0,0,0,0.8)] lg:w-120 lg:p-12',
            open ? 'animate-slide-in-right' : 'animate-slide-out-right',
          )}
        >
          <Dialog.Title className="mb-8 text-xl font-bold text-gray-100">
            Sacola de Compras
          </Dialog.Title>
          <Dialog.Description></Dialog.Description>
          <Dialog.Close className="absolute top-7 right-7 border-0 bg-none text-zinc-300">
            <XIcon size={24} weight="bold" />
          </Dialog.Close>
          <section className="mb-8 flex flex-col gap-6">
            {cartItems.length <= 0 && (
              <p className="text-gray-300">
                Parece que seu carrinho está vazio.
              </p>
            )}
            {cartItems.map((cartItem) => (
              <div key={cartItem.id} className="flex">
                <div className="mr-5 h-25 w-23 rounded-lg bg-linear-to-b from-[#1ea483] to-[#7465d4]">
                  <Image
                    src={cartItem.imageUrl}
                    alt=""
                    width={101}
                    height={93}
                  />
                </div>
                <div className="flex h-full flex-col">
                  <p className="text-lg text-gray-300">{cartItem.name}</p>
                  <strong className="text-lg font-bold text-gray-200 lg:mt-1">
                    {cartItem.price}
                  </strong>
                  <button
                    onClick={() => {
                      removeCartItem(cartItem.id)
                    }}
                    className="mt-auto w-max cursor-pointer border-none bg-transparent font-bold text-emerald-700 hover:text-emerald-500"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </section>
          <div className="mt-auto flex flex-col">
            <div className="mb-13.75 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Quantidade</span>
                <p className="text-lg text-gray-300">
                  {cartQuantity} {cartQuantity > 1 ? 'itens' : 'item'}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-lg leading-[160%] font-bold text-gray-100">
                  Valor total
                </p>
                <span className="text-2xl font-bold text-gray-100">
                  {formattedCartTotal}
                </span>
              </div>
            </div>
            <button
              disabled={isCreatingCheckoutSession || cartQuantity <= 0}
              onClick={handleCheckout}
              className={twMerge(
                'h-17.25 w-full cursor-pointer rounded-lg border-none bg-emerald-700 p-5 text-center text-lg font-bold text-gray-100 hover:bg-emerald-500',
                'disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-emerald-700',
              )}
            >
              Finalizar Compra
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

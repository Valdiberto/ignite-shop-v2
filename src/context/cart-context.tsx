'use client'

import { createContext, ReactNode, useState } from 'react'
import { useToast } from './toast-provider'

export interface CartItem {
  id: string
  name: string
  imageUrl: string
  price: string
  priceId: string
  quantity: number
  numberPrice: number
  defaultPriceId: string
  description: string
}

interface CartContextType {
  cartItems: CartItem[]
  cartTotal: number
  addToCart: (product: CartItem) => void
  removeCartItem: (productId: string) => void
  checkIfItemAlreadyExists: (productId: string) => boolean
}

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextType)
export function CartContextProvider({ children }: CartContextProviderProps) {
  const { addToast } = useToast()
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const cartTotal = cartItems.reduce((total, product) => {
    return total + product.numberPrice * product.quantity
  }, 0)

  function addToCart(product: CartItem) {
    setCartItems((prev) => {
      const productIndex = prev.findIndex((item) => item.id === product.id)

      if (productIndex >= 0) {
        const updateCart = [...prev]
        updateCart[productIndex].quantity += 1
        return updateCart
      }

      return [...prev, { ...product, quantity: 1 }]
    })
    addToast({
      title: 'Item adicionado!',
      description: `O  ${product.name} foi adicionado ao carrinho.`,
      variant: 'success',
    })
  }

  function removeCartItem(productId: string) {
    setCartItems((state) => state.filter((item) => item.id !== productId))
  }

  function checkIfItemAlreadyExists(productId: string) {
    return cartItems.some((product) => product.id === productId)
  }

  return (
    <CartContext.Provider
      value={{
        cartTotal,
        cartItems,
        addToCart,
        removeCartItem,
        checkIfItemAlreadyExists,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

'use client'

import { CartItem } from '@/context/cart-context'
import { useCart } from '@/hooks/use-cart'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface ProductClientProps {
  product: CartItem
}

export function ProductPageClient({ product }: ProductClientProps) {
  const { addToCart, checkIfItemAlreadyExists } = useCart()

  function handleAddToCart(
    e: React.MouseEvent<HTMLButtonElement>,
    product: CartItem,
  ) {
    e.preventDefault()
    addToCart(product)
  }
  return (
    <div className="mt-8 flex flex-col items-stretch gap-16 px-5 lg:grid lg:grid-cols-2 lg:px-[260px]">
      <div className="flex max-h-[350px] min-h-[350px] items-center justify-center rounded-lg bg-linear-to-b from-[#1ea483] to-[#7465d4] p-1 lg:max-h-[576px] lg:min-h-[576px]">
        <Image
          className="object-cover"
          src={product.imageUrl}
          width={520}
          height={480}
          alt={product.name}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl text-gray-200">{product.name}</h1>
        <span className="block text-3xl text-emerald-500">{product.price}</span>

        <p className="mt-6 text-lg leading-[160%] text-gray-200">
          {product.description}
        </p>
        <button
          disabled={checkIfItemAlreadyExists(product.id)}
          onClick={(e) => handleAddToCart(e, product)}
          className={twMerge(
            'mt-auto cursor-pointer rounded-lg border-0 bg-emerald-700 p-5 text-lg font-bold text-white transition-colors duration-300 hover:bg-emerald-500',
            'disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-emerald-700',
          )}
        >
          Colocar na sacola
        </button>
      </div>
    </div>
  )
}

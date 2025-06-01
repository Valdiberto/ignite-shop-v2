'use client'

import { CartItem } from '@/context/cart-context'
import { useCart } from '@/hooks/use-cart'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import { HandbagIcon } from '@phosphor-icons/react/dist/ssr'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { ProductCardSkeleton } from './product-card-skeleton'

interface HomeProps {
  products: CartItem[]
}

export function ProductCarousel({ products }: HomeProps) {
  const { addToCart, checkIfItemAlreadyExists } = useCart()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [prevEnabled, setPrevEnabled] = useState(false)
  const [nextEnabled, setNextEnabled] = useState(false)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevEnabled(emblaApi.canScrollPrev())
    setNextEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  function handleAddToCart(
    e: React.MouseEvent<HTMLButtonElement>,
    product: CartItem,
  ) {
    e.preventDefault()

    addToCart(product)
  }

  const isLoading = !products || products.length === 0
  return (
    <div className="relative mt-8">
      <div className="overflow-hidden pl-5 lg:pl-[260px]" ref={emblaRef}>
        <div className="flex w-max touch-pan-x space-x-2 lg:w-full lg:space-x-12">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : products.map((product) => (
                <Link
                  prefetch={false}
                  href={`/product/${product.id}`}
                  key={product.id}
                >
                  <div
                    key={product.id}
                    className={twMerge(
                      'group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg p-1',
                      'lg:max-h-[656px] lg:min-h-[656px] lg:max-w-[696px] lg:min-w-[696px]',
                      'bg-linear-to-b from-[#1ea483] to-[#7465d4]',
                    )}
                  >
                    <Image
                      className="h-[420px] w-[230px] object-cover lg:h-[520px] lg:w-[480px]"
                      src={product.imageUrl}
                      height={520}
                      width={480}
                      alt={product.name}
                    />

                    <footer
                      className={twMerge(
                        'flex w-full items-center justify-between gap-5 p-3',
                        'lg:absolute lg:right-1 lg:bottom-1 lg:left-1 lg:translate-y-full lg:py-5 lg:pr-8 lg:pl-5 lg:opacity-0',
                        'rounded-md bg-gray-950/60 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100',
                      )}
                    >
                      <div className="flex flex-col">
                        <strong className="text-lg text-gray-100 lg:text-xl">
                          {product.name}
                        </strong>

                        <span className="text-2xl font-bold text-emerald-600">
                          {product.price}
                        </span>
                      </div>
                      <button
                        disabled={checkIfItemAlreadyExists(product.id)}
                        onClick={(e) => handleAddToCart(e, product)}
                        className="cursor-pointer rounded-md border-0 bg-emerald-700 p-3 transition-colors duration-300 hover:bg-emerald-500"
                      >
                        <HandbagIcon
                          className="text-gray-100"
                          size={34}
                          weight="bold"
                        />
                      </button>
                    </footer>
                  </div>
                </Link>
              ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        disabled={!prevEnabled}
        className={twMerge(
          'absolute top-1/2 left-0 z-10 flex h-full w-[136px] -translate-y-1/2 items-center transition',
          'bg-linear-to-l from-0% to-[#121214]/50 to-75% p-2 text-gray-300 shadow-md',
          'disabled:opacity-30',
          !prevEnabled && 'pointer-events-none opacity-0',
        )}
      >
        <CaretLeftIcon className="h-12 w-12" />
      </button>
      <button
        onClick={scrollNext}
        disabled={!nextEnabled}
        className={twMerge(
          'absolute top-1/2 right-0 z-10 flex h-full w-[136px] -translate-y-1/2 items-center justify-end transition',
          'bg-linear-to-r from-0% to-[#121214]/50 to-75% p-2 text-gray-300 shadow-md',
          'disabled:opacity-30',
          !nextEnabled && 'pointer-events-none opacity-0',
        )}
      >
        <CaretRightIcon
          className={twMerge('h-12 w-12', !nextEnabled && 'opacity-0')}
        />
      </button>
    </div>
  )
}

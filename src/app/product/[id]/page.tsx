import { ProductPageClient } from '@/components/product-page-client'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const awaitedParams = await params

  const idParams = awaitedParams.id

  const product = await stripe.products.retrieve(idParams, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  const productData = {
    id: product.id,
    name: product.name,
    description: product.description ?? '',
    imageUrl: product.images[0],
    price: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price.unit_amount! / 100),
    defaultPriceId: price.id,
    quantity: 1,
    priceId: price.id,
    numberPrice: price.unit_amount! / 100,
  }

  return <ProductPageClient product={productData} />
}

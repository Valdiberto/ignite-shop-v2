import { stripe } from '@/lib/stripe'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>
}) {
  const awaitedSearchParams = await searchParams

  const sessionId = awaitedSearchParams.session_id

  if (!sessionId) {
    redirect('/') // se não tiver session_id na URL, volta pro home
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name ?? 'Cliente'

  const productsImages =
    session.line_items?.data.map((item) => {
      const product = item.price?.product as Stripe.Product
      return product.images[0]
    }) ?? []

  const totalProducts = productsImages.length
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-12 flex items-center -space-x-[52px]">
        {productsImages.map((imageUrl, index) => (
          <div
            key={index}
            className="relative mt-26 flex max-h-[140px] w-full max-w-[140px] items-center justify-center rounded-full bg-linear-to-b from-[#1ea483] to-[#7465d4] p-1 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
          >
            <Image
              className="object-cover"
              src={imageUrl}
              alt=""
              width={120}
              height={120}
            />
          </div>
        ))}
      </div>
      <h1 className="text-3xl font-bold text-gray-100">Compra efetuada!</h1>

      <p className="mt-6 text-center text-lg leading-[140%] text-gray-300">
        Uhuul <strong>{customerName}</strong>, sua compra de {totalProducts}{' '}
        {totalProducts === 1 ? 'camiseta' : 'camisetas'} já está a caminho da
        sua casa.
      </p>

      <Link
        className="mt-8 block leading-[140%] font-bold text-emerald-700 decoration-0 hover:text-emerald-500"
        href="/"
      >
        Voltar ao catálogo
      </Link>
    </div>
  )
}

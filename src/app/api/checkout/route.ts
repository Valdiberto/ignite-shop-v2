import { stripe } from '@/lib/stripe'
import { CartItem } from '@/context/cart-context'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const products: CartItem[] = body.products

  if (!products || products.length === 0) {
    return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: products.map((product) => ({
      price: product.defaultPriceId,
      quantity: product.quantity ?? 1,
    })),
  })

  return NextResponse.json(
    { checkoutUrl: checkoutSession.url },
    { status: 201 },
  )
}

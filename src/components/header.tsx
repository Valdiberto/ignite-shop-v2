'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Cart } from './cart'
import logo from '../../public/assets/logo.svg'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export function Header() {
  const pathname = usePathname()

  const isCheckout = pathname?.startsWith('/success')

  const ShowCartButton = pathname !== '/success'

  return (
    <div
      className={twMerge(
        'flex w-full items-center justify-between px-5 pt-10 lg:px-[260px]',
        isCheckout && 'justify-center pt-16',
      )}
    >
      <Link href="/">
        <Image width={130} height={52} src={logo} alt="" />
      </Link>

      {ShowCartButton && <Cart />}
    </div>
  )
}

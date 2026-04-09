"use client"

import { useCart } from "@/lib/CartContext"

type Props = {
  plant: {
    id: string
    name: string
    price: number
    promo_price: number | null
    image_url: string
  }
  className?: string
}

function AddToCartButton({ plant, className }: Props) {
  const { addToCart } = useCart()

  return (
    <button
      className={className}
      onClick={(e) => {
        e.preventDefault()
        addToCart(plant)
      }}
    >
      +
    </button>
  )
}

export default AddToCartButton
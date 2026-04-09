"use client"

import { useCart } from "@/lib/CartContext"
import styles from "@/styles/Planta.module.css"

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

function CartButton({ plant }: Props) {
  const { addToCart } = useCart()

  return (
    <button
      className={styles.btn}
      onClick={() => addToCart(plant)}
    >
      Adicionar ao carrinho
    </button>
  )
}

export default CartButton
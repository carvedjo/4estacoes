"use client"

import { createContext, useContext, useState } from "react"

type Plant = {
  id: string
  name: string
  price: number
  promo_price: number | null
  image_url: string
}

type CartItem = {
  plant: Plant
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addToCart: (plant: Plant) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  total: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  function addToCart(plant: Plant) {
    setItems(prev => {
      const exists = prev.find(item => item.plant.id === plant.id)
      if (exists) {
        return prev.map(item =>
          item.plant.id === plant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { plant, quantity: 1 }]
    })
  }

  function removeFromCart(id: string) {
    setItems(prev => prev.filter(item => item.plant.id !== id))
  }

  let total = 0
  for (const item of items) {
    const price = item.plant.promo_price ?? item.plant.price
    total += price * item.quantity
  }
  function updateQuantity(id: string, quantity: number) {
  if (quantity < 1) {
    removeFromCart(id)
    return
  }
  setItems(prev =>
    prev.map(item =>
      item.plant.id === id ? { ...item, quantity } : item
    )
  )
}

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used inside CartProvider")
  return context
}
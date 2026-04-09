"use client"

import { useState } from "react"
import Link from "next/link"
import { useCart } from "@/lib/CartContext"
import styles from "@/styles/Navbar.module.css"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { items, removeFromCart, total } = useCart()

  let totalItems = 0
  for (const item of items) {
    totalItems += item.quantity
  }

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        4 Estações
      </Link>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
        <li>
          <Link href="/loja" onClick={() => setMenuOpen(false)}>
            Loja
          </Link>
        </li>
      </ul>

      <div className={styles.right}>
        <div className={styles.cartWrapper}>
          <button className={styles.cartBtn} onClick={() => setCartOpen(!cartOpen)}>
            🛒
            {totalItems > 0 && (
              <span className={styles.cartCount}>{totalItems}</span>
            )}
          </button>

          {cartOpen && (
            <div className={styles.cartDropdown}>
              {items.length === 0 ? (
                <p className={styles.cartEmpty}>O teu carrinho está vazio.</p>
              ) : (
                <>
                  <ul className={styles.cartList}>
                    {items.map(item => (
                      <li key={item.plant.id} className={styles.cartItem}>
                        <div className={styles.cartItemInfo}>
                          <span className={styles.cartItemName}>{item.plant.name}</span>
                          <span className={styles.cartItemQty}>x{item.quantity}</span>
                          <div className={styles.cartItemPrice}>
                            {item.plant.promo_price ? (
                              <>
                                <span className={styles.cartItemPriceOld}>
                                  {(item.plant.price * item.quantity).toFixed(2)}€
                                </span>
                                <span className={styles.cartItemPricePromo}>
                                  {(item.plant.promo_price * item.quantity).toFixed(2)}€
                                </span>
                              </>
                            ) : (
                              <span>{(item.plant.price * item.quantity).toFixed(2)}€</span>
                            )}
                          </div>
                        </div>
                        <button
                          className={styles.cartItemRemove}
                          onClick={() => removeFromCart(item.plant.id)}
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.cartTotal}>
                    <span>Total</span>
                    <span>{total.toFixed(2)}€</span>
                  </div>
                  <Link href="/cart" className={styles.cartCheckout} onClick={() => setCartOpen(false)}>
                    Ver carrinho
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
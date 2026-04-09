"use client"

import { useCart } from "@/lib/CartContext"
import styles from "@/styles/Cart.module.css"
import Link from "next/link"

function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart()

  if (items.length === 0) {
    return (
      <main className={styles.main}>
        <h1 className={styles.titulo}>O teu carrinho</h1>
        <p className={styles.vazio}>O teu carrinho está vazio.</p>
        <Link href="/loja" className={styles.btn}>Ver loja</Link>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.titulo}>O teu carrinho</h1>
      <div className={styles.lista}>
        {items.map((item) => (
          <div key={item.plant.id} className={styles.item}>
            <div className={styles.itemImg}>
              {item.plant.image_url ? (
                <img src={item.plant.image_url} alt={item.plant.name} />
              ) : (
                <span>🌿</span>
              )}
            </div>
            <div className={styles.itemInfo}>
              <h2 className={styles.itemNome}>{item.plant.name}</h2>
              <div className={styles.itemQtd}>
                <span>Quantidade:</span>
                <input
                  className={styles.qtdInput}
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.plant.id, Number(e.target.value))}
                />
              </div>
              <div className={styles.itemPrecos}>
                {item.plant.promo_price ? (
                  <>
                    <span className={styles.itemPrecoAntigo}>
                      {(item.plant.price * item.quantity).toFixed(2)}€
                    </span>
                    <span className={styles.itemPrecoPromo}>
                      {(item.plant.promo_price * item.quantity).toFixed(2)}€
                    </span>
                  </>
                ) : (
                  <span className={styles.itemPreco}>
                    {(item.plant.price * item.quantity).toFixed(2)}€
                  </span>
                )}
              </div>
              <p className={styles.itemQtd}>Quantidade: {item.quantity}</p>
            </div>
            <button
              className={styles.remover}
              onClick={() => removeFromCart(item.plant.id)}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
      <div className={styles.total}>
        <span>Total</span>
        <span>{total.toFixed(2)}€</span>
      </div>
      <button className={styles.btn}>Finalizar compra</button>
    </main>
  )
}

export default Cart
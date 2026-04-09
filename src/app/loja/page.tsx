export const revalidate = 0
import { supabase } from "@/lib/supabase"
import styles from "@/styles/Loja.module.css"
import Link from "next/link"
import AddToCartButton from "@/components/AddToCartButton"

async function Loja() {
  const { data: plantas } = await supabase
    .from('plants')
    .select('*')
    .order('name')

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.titulo}>Loja</h1>
        <p className={styles.sub}>Todas as plantas</p>
      </div>
      <div className={styles.cards}>
        {plantas?.map((planta, index) => {
          const cores = [styles.cardImgGreen, styles.cardImgYellow, styles.cardImgPink, styles.cardImgBlue, styles.cardImgRed]
          return (
            <Link
              key={planta.id}
              href={`/planta/${planta.id}`}
              className={styles.card}
            >
              <div className={`${styles.cardImg} ${cores[index % cores.length]}`}>
                {planta.image_url ? (
                  <img src={planta.image_url} alt={planta.name} />
                ) : (
                  <span>🌿</span>
                )}
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardCat}>{planta.category}</span>
                <h3 className={styles.cardName}>{planta.name}</h3>
                <div className={styles.cardBottom}>
                  <div className={styles.prices}>
                    {planta.promo_price ? (
                      <>
                        <span className={styles.cardPriceOld}>{planta.price}€</span>
                        <span className={styles.cardPricePromo}>{planta.promo_price}€</span>
                      </>
                    ) : (
                      <span className={styles.cardPrice}>{planta.price}€</span>
                    )}
                  </div>
                  <AddToCartButton
                    plant={planta}
                    className={`${styles.cardAdd} ${cores[index % cores.length]}`}
                  />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}

export default Loja
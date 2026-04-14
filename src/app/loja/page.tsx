export const revalidate = 0
import { supabase } from "@/lib/supabase"
import styles from "@/styles/Loja.module.css"
import Link from "next/link"
import AddToCartButton from "@/components/AddToCartButton"

const PER_PAGE = 9

type Props = {
  searchParams: Promise<{ page?: string }>
}

async function Loja({ searchParams} : Props) {
  const {page} = await searchParams
  const currentPage = Number(page) || 1
  const start = (currentPage - 1) * PER_PAGE
  const end = start + PER_PAGE - 1


  const { data: plants, count } = await supabase
    .from('plants')
    .select('*',{ count: 'exact' })
    .order('name')
    .range(start,end)

  const totalPages = Math.ceil((count || 0) / PER_PAGE)

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.titulo}>Loja</h1>
        <p className={styles.sub}>Todas as plantas</p>
      </div>
      <div className={styles.cards}>
        {plants?.map((plant, index) => {
          const colors = [styles.cardImgGreen, styles.cardImgYellow, styles.cardImgPink, styles.cardImgBlue, styles.cardImgRed]
          const colorIndex = (start + index) % colors.length
          return (
            <Link
              key={plant.id}
              href={`/planta/${plant.id}`}
              className={styles.card}
            >
              <div className={`${styles.cardImg} ${colors[colorIndex]}`}>
                {plant.image_url ? (
                  <img src={plant.image_url} alt={plant.name} />
                ) : (
                  <span>🌿</span>
                )}
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardCat}>{plant.category}</span>
                <h3 className={styles.cardName}>{plant.name}</h3>
                <div className={styles.cardBottom}>
                  <div className={styles.prices}>
                    {plant.promo_price ? (
                      <>
                        <span className={styles.cardPriceOld}>{plant.price}€</span>
                        <span className={styles.cardPricePromo}>{plant.promo_price}€</span>
                      </>
                    ) : (
                      <span className={styles.cardPrice}>{plant.price}€</span>
                    )}
                  </div>
                  <AddToCartButton
                    plant={plant}
                    className={`${styles.cardAdd} ${colors[colorIndex]}`}
                  />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
            <Link
              key={num}
              href={`/loja?page=${num}`}
              className={`${styles.pageBtn} ${num === currentPage ? styles.pageBtnActive : ''}`}
            >
              {num}
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}

export default Loja
import styles from "@/styles/Home.module.css"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import HeroSlider from "@/components/HeroSlider"
import AddToCartButton from "@/components/AddToCartButton"


async function Home() {
    const { data: plantas } = await supabase
    .from('plants')
    .select('*')
    .eq('featured', true)
  const cores = [styles.cardImgVerde, styles.cardImgAmarelo, styles.cardImgRosa]

  return (
    <main>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className={styles.eyebrow}>✦ Nova Colecção · Primavera</span>
          <h1 className={styles.heroTitle}>
            PLANTA<br />O TEU<br />AMBIENTE
          </h1>
          <p className={styles.heroSub}>
            Dá vida ao teu espaço.
          </p>
          <Link href="/loja" className={styles.heroBtn}>
            Explorar Loja →
          </Link>
        </div>
        <div className={styles.heroRight}>
          <HeroSlider />
        </div>
      </section>

      {/* TICKER */}
      <div className={styles.ticker}>
        <p className={styles.tickerText}>
          <span>Plantas</span><span className={styles.dot}>●</span>
          <span>Entrega em todo o país</span><span className={styles.dot}>●</span>
          <span>Planta o teu ambiente</span><span className={styles.dot}>●</span>
          <span>Coleção de primavera disponível</span><span className={styles.dot}>●</span>
          <span>Groovy & Green</span><span className={styles.dot}>●</span>
        </p>
        <p className={styles.tickerText} aria-hidden="true">
          <span>Plantas</span><span className={styles.dot}>●</span>
          <span>Entrega em todo o país</span><span className={styles.dot}>●</span>
          <span>Planta o teu ambiente</span><span className={styles.dot}>●</span>
          <span>Coleção de primavera disponível</span><span className={styles.dot}>●</span>
          <span>Groovy & Green</span><span className={styles.dot}>●</span>
        </p>
        <p className={styles.tickerText} aria-hidden="true">
          <span>Plantas</span><span className={styles.dot}>●</span>
          <span>Entrega em todo o país</span><span className={styles.dot}>●</span>
          <span>Planta o teu ambiente</span><span className={styles.dot}>●</span>
          <span>Coleção de primavera disponível</span><span className={styles.dot}>●</span>
          <span>Groovy & Green</span><span className={styles.dot}>●</span>
        </p>
      </div>

      {/* DESTAQUE */}
      <section className={styles.featured}>
        <div className={styles.featHeader}>
          <h2 className={styles.featTitle}>EM DESTAQUE</h2>
          <span className={styles.featTag}>Selecção da semana</span>
        </div>
        <div className={styles.cards}>
          {plantas?.map((planta, index) => (
            <Link key={planta.id} href={`/planta/${planta.id}`} className={styles.card}>
              <div className={`${styles.cardImg} ${cores[index % cores.length]}`}>
                <img src={planta.image_url} alt={planta.name}></img>
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
          ))}
        </div>
      </section>

    </main>
  )
}

export default Home
import { supabase } from "@/lib/supabase"
import styles from "@/styles/Planta.module.css"
import Link from "next/link"
import CartButton from "@/components/CartButton"

type Props = {
  params: Promise <{id: string}>
}


async function Planta({ params }: Props) {
  const {id}= await params;

  const {data: planta} = await supabase
  .from('plants')
  .select('*')
  .eq('id', id)
  .single()

  if(!planta){
    return(
      <main className={styles.main}>
        <p>Planta não encontrada.</p>
        <Link href="/loja">← Voltar à loja</Link>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <Link href="/loja" className={styles.voltar}>← Voltar à loja</Link>
      <div className={styles.container}>
        <div className={styles.imagem}>
          {planta.image_url ? (
            <img src={planta.image_url} alt={planta.name} />
          ) : (
            <span>🌿</span>
          )}
        </div>
        <div className={styles.info}>
          <span className={styles.categoria}>{planta.category}</span>
          <h1 className={styles.nome}>{planta.name}</h1>
          <p className={styles.descricao}>{planta.description}</p>
          <div className={styles.precos}>
            {planta.promo_price ? (
              <>
                <span className={styles.precoAntigo}>{planta.price}€</span>
                <span className={styles.precoPromo}>{planta.promo_price}€</span>
              </>
            ) : (
              <p className={styles.preco}>{planta.price}€</p>
            )}
          </div>
          <CartButton plant={planta} />
        </div>
      </div>
    </main>
  )
}

export default Planta
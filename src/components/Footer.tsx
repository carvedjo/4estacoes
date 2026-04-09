import styles from "@/styles/Footer.module.css"
import Link from "next/link"

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>4 Estações</div>
      <div className={styles.links}>
        <Link href="/loja">Loja</Link>
        <Link href="/sobre">Sobre</Link>
      </div>
      <p className={styles.copy}>© 2025 4 Estações</p>
    </footer>
  )
}

export default Footer
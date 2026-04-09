"use client"

import { useState, useEffect } from "react"
import styles from "@/styles/HeroSlider.module.css"

const imagens = [
  "https://images.unsplash.com/photo-1609846247071-5355066b1aa6?q=80&w=685",
  "https://images.unsplash.com/photo-1775494117665-5e728dd2c818?q=80&w=682",
  "https://images.unsplash.com/photo-1714744782085-5bf3df7c21f6?q=80&w=764",
]

function HeroSlider() {
  const [actual, setActual] = useState(0)

  useEffect(() => {
    const time = setInterval(() => {
      setActual((prev) => (prev + 1) % imagens.length)
    }, 10000)
    return () => clearInterval(time)
  }, [])

  return (
    <div className={styles.slider}>
      {imagens.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`Slide ${i + 1}`}
          className={`${styles.img} ${i === actual ? styles.visivel : styles.escondido}`}
        />
      ))}
    </div>
  )
}

export default HeroSlider
"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import styles from "@/styles/AdminForm.module.css"
import Link from "next/link"

function AddPlant() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [promoPrice, setPromoPrice] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [description, setDescription] = useState("")
  const [featured, setFeatured] = useState(false)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const fileName = `${Date.now()}-${file.name}`
    const { error } = await supabase.storage
      .from('plants')
      .upload(fileName, file)

    if (error) {
      alert('Erro ao fazer upload da imagem')
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from('plants')
      .getPublicUrl(fileName)

    setImageUrl(urlData.publicUrl)
    setUploading(false)
  }

  async function handleSave() {
    if (!name || !price || !category) {
      alert('Nome, preço e categoria são obrigatórios')
      return
    }

    await supabase.from("plants").insert({
      name,
      price: Number(price),
      category,
      image_url: imageUrl,
      description,
      featured,
      promo_price: promoPrice ? Number(promoPrice) : null,
    })

    router.push("/admin")
  }

  return (
    <main className={styles.main}>
      <Link href="/admin" className={styles.voltar}>← Voltar ao painel</Link>
      <h1 className={styles.titulo}>Adicionar</h1>
      <div className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Nome</label>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Monstera Deliciosa"
          />
        </div>
        <div className={styles.row}>
            <div className={styles.field}>
                <label className={styles.label}>Preço</label>
                <input
                className={styles.input}
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ex: 19.99"
                />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Promo (opcional)</label>
                <input
                className={styles.input}
                type="number"
                placeholder="N/A"
                value={promoPrice}
                onChange={(e) => setPromoPrice(e.target.value)}
                />
            </div>
        </div>
            <div className={styles.field}>
            <label className={styles.label}>Categoria</label>
            <input
                className={styles.input}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Ex: Interior"
            />
            </div>
        <div className={styles.field}>
          <label className={styles.label}>Imagem</label>
          <input
            className={styles.input}
            value={imageUrl}
            placeholder="URL da imagem"
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <div className={styles.uploadOr}>
            <span>ou faz upload</span>
          </div>
          <input
            type="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={handleImageUpload}
            disabled={uploading}
          />
          {uploading && <p className={styles.uploading}>A fazer upload...</p>}
          {imageUrl && (
            <img src={imageUrl} alt="preview" className={styles.preview} />
          )}
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Descrição</label>
          <textarea
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreve a planta..."
          />
        </div>
        <div className={styles.field}>
          <label className={styles.checkLabel}>
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Em destaque
          </label>
        </div>
        <div className={styles.btns}>
          <button className={styles.saveBtn} onClick={handleSave}>Adicionar</button>
          <Link href="/admin" className={styles.cancelBtn}>Cancelar</Link>
        </div>
      </div>
    </main>
  )
}

export default AddPlant
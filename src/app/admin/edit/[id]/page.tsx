"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import styles from "@/styles/AdminForm.module.css"
import Link from "next/link"

type Plant = {
  id: string
  name: string
  price: number
  category: string
  image_url: string
  description: string
  featured: boolean
  promo_price: number | null
}

function EditPlant({ params }: { params: Promise<{ id: string }> }) {
  const [plant, setPlant] = useState<Plant | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    checkSession()
  }, [])

  async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push("/admin/login")
      return
    }
    const { id } = await params
    const { data } = await supabase.from("plants").select("*").eq("id", id).single()
    if (data) setPlant(data)
    setLoading(false)
  }
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0]
  if (!file || !plant) return

  setUploading(true)
  const fileName = `${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage
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

  setPlant({ ...plant, image_url: urlData.publicUrl })
  setUploading(false)
}

  async function handleSave() {
    if (!plant) return
    await supabase.from("plants").update({
      name: plant.name,
      price: plant.price,
      category: plant.category,
      image_url: plant.image_url,
      description: plant.description,
      featured: plant.featured,
      promo_price: plant.promo_price || null,
    }).eq("id", plant.id)
    router.push("/admin")
  }

  if (loading) {
    return <main className={styles.loading}><p>A carregar...</p></main>
  }

  if (!plant) {
    return <main className={styles.loading}><p>Planta não encontrada.</p></main>
  }
  

  return (
    <main className={styles.main}>
      <Link href="/admin" className={styles.voltar}>← Voltar ao painel</Link>
      <h1 className={styles.titulo}>Editar planta</h1>
      <div className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Nome</label>
          <input
            className={styles.input}
            value={plant.name}
            onChange={(e) => setPlant({ ...plant, name: e.target.value })}
          />
        </div>
        <div className={styles.row}>
        <div className={styles.field}>
            <label className={styles.label}>Preço</label>
            <input
            className={styles.input}
            type="number"
            value={plant.price}
            onChange={(e) => setPlant({ ...plant, price: Number(e.target.value) })}
            />
        </div>
        <div className={styles.field}>
            <label className={styles.label}>Promo (opcional)</label>
            <input
            className={styles.input}
            type="number"
            placeholder="N/A"
            value={plant.promo_price || ""}
            onChange={(e) => setPlant({ ...plant, promo_price: e.target.value ? Number(e.target.value) : null })}
            />
        </div>
        </div>
        <div className={styles.field}>
        <label className={styles.label}>Categoria</label>
        <input
            className={styles.input}
            value={plant.category}
            onChange={(e) => setPlant({ ...plant, category: e.target.value })}
        />
        </div>
        <div className={styles.field}>
        <label className={styles.label}>Imagem</label>
        <input
            className={styles.input}
            value={plant.image_url}
            placeholder="URL da imagem"
            onChange={(e) => setPlant({ ...plant, image_url: e.target.value })}
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
        {plant.image_url && (
            <img src={plant.image_url} alt="preview" className={styles.preview} />
        )}
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Descrição</label>
          <textarea
            className={styles.textarea}
            value={plant.description}
            onChange={(e) => setPlant({ ...plant, description: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.checkLabel}>
            <input
              type="checkbox"
              checked={plant.featured}
              onChange={(e) => setPlant({ ...plant, featured: e.target.checked })}
            />
            Em destaque
          </label>
        </div>
        <div className={styles.btns}>
          <button className={styles.saveBtn} onClick={handleSave}>Guardar</button>
          <Link href="/admin" className={styles.cancelBtn}>Cancelar</Link>
        </div>
      </div>
    </main>
  )
}

export default EditPlant
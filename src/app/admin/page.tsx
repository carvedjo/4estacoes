
"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import styles from "@/styles/Admin.module.css"

type Plant = {
  id: string
  name: string
  price: number
  category: string
  image_url: string
  description: string
  featured: boolean
}

function Admin() {
  const [plants, setPlants] = useState<Plant[]>([])
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkSession()
  }, [])

  async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { router.push("/admin/login")
      return
    }
    await fetchPlants()
    setLoading(false)
  }
  async function fetchPlants() {
    const { data } = await supabase.from("plants").select("*").order("name")
    if (data) setPlants(data)
  }

  async function handleDelete(id: string) {
    await supabase.from("plants").delete().eq("id", id)
    fetchPlants()
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  if (loading) {
    return (
      <main className={styles.loading}>
        <p>A carregar...</p>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.titulo}>Painel Admin</h1>
        <button className={styles.logoutBtn} onClick={handleLogout}>Sair</button>
      </div>

      <div className={styles.lista}>
        {plants.map(plant => (
          <div key={plant.id} className={styles.item}>
            <div className={styles.itemInfo}>
              <span className={styles.itemNome}>{plant.name}</span>
              <span className={styles.itemCat}>{plant.category}</span>
              <span className={styles.itemPreco}>{plant.price}€</span>
            </div>
            <div className={styles.itemActions}>
              <button
                className={styles.editBtn}
                onClick={() => router.push(`/admin/edit/${plant.id}`)}
              >
                Editar
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(plant.id)}
              >
                Apagar
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className={styles.addBtn}
        onClick={() => router.push("/admin/add")}
      >
        + Adicionar planta
      </button>
    </main>
  )
}

export default Admin
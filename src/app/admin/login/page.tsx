"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import styles from "@/styles/AdminLogin.module.css"

function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
      checkSession()
    }, [])

  async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession()
  if (session) router.push("/admin")
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError("Credenciais inválidas")
      return
    }
    router.push("/admin")
  }

  return (
    <main className={styles.main}>
      <div className={styles.box}>
        <h1 className={styles.titulo}>Admin</h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.btn} type="submit">Entrar</button>
        </form>
      </div>
    </main>
  )
}

export default AdminLogin
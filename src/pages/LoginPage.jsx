import "./styles1.css"

import { useState } from "react"
import { login } from "../lib/api"
import { setToken } from "../lib/auth"
import { Link, useNavigate } from "react-router-dom"

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" })
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    try {
      const res = await login(form)
      setToken(res.data.token)
      navigate("/menu")
    } catch {
      alert("Invalid credentials")
    } finally { setBusy(false) }
  }

  return (
    <section className="filter-bar">
      <h3 className="mb-3">Login</h3>
      <form onSubmit={onSubmit}>
        <input className="mb-2" name="username" placeholder="username" value={form.username} onChange={e=>setForm({...form,[e.target.name]:e.target.value})}/>
        <br />
        <input className="mb-2" name="password" type="password" placeholder="password" value={form.password} onChange={e=>setForm({...form,[e.target.name]:e.target.value})}/>
        <br />
        <button type="submit" disabled={busy}>{busy ? "..." : "Login"}</button>
      </form>
      <p className="mt-3">No account? <Link to="/signup">Signup</Link></p>
    </section>
  )
}
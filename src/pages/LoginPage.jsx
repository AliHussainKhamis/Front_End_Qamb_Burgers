// src/pages/LoginPage.jsx
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
    } catch (e) {
      alert("Invalid credentials")
    } finally { setBusy(false) }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input name="username" placeholder="username" value={form.username} onChange={e=>setForm({...form,[e.target.name]:e.target.value})}/>
        <input name="password" type="password" placeholder="password" value={form.password} onChange={e=>setForm({...form,[e.target.name]:e.target.value})}/>
        <button type="submit" disabled={busy}>{busy?"...":"Login"}</button>
      </form>
      <p>No account? <Link to="/signup">Signup</Link></p>
    </div>
  )
}

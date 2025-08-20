// src/pages/SignupPage.jsx
import { useState } from "react"
import { signup } from "../lib/api"
import { Link, useNavigate } from "react-router-dom"

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", password: "" })
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    try {
      await signup(form)
      alert("Account created. Please login.")
      navigate("/login")
    } catch {
      alert("Signup failed (maybe username taken).")
    } finally { setBusy(false) }
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={onSubmit}>
        <input name="username" placeholder="username" value={form.username} onChange={e=>setForm({...form,[e.target.name]:e.target.value})}/>
        <input name="password" type="password" placeholder="password" value={form.password} onChange={e=>setForm({...form,[e.target.name]:e.target.value})}/>
        <button type="submit" disabled={busy}>{busy?"...":"Create"}</button>
      </form>
      <p>Have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}

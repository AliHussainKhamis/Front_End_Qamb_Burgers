// src/pages/SignupPage.jsx
import { useState } from "react"
import { signup } from "../lib/api"
import { useNavigate, Link } from "react-router-dom"

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", password: "" })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    try {
      await signup(form)
      alert("Account created. Please login.")
      navigate("/login")
    } catch (e) {
      alert("Signup failed (maybe username taken).")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={onSubmit}>
        <input name="username" placeholder="username" onChange={onChange} value={form.username} />
        <input name="password" placeholder="password" type="password" onChange={onChange} value={form.password} />
        <button type="submit" disabled={loading}>{loading ? "..." : "Create"}</button>
      </form>
      <p>Have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}

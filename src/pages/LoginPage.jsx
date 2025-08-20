// src/pages/LoginPage.jsx
import { useState } from "react"
import { login } from "../lib/api"
import { setToken } from "../lib/auth"
import { useNavigate, Link } from "react-router-dom"

export default function LoginPage() {
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
      const res = await login(form)
      setToken(res.data.token)
      navigate("/menu")
    } catch (e) {
      alert("Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input name="username" placeholder="username" onChange={onChange} value={form.username} />
        <input name="password" placeholder="password" type="password" onChange={onChange} value={form.password} />
        <button type="submit" disabled={loading}>{loading ? "..." : "Login"}</button>
      </form>
      <p>No account? <Link to="/signup">Sign up</Link></p>
    </div>
  )
}

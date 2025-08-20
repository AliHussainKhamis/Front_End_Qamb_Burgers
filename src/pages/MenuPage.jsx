// src/pages/MenuPage.jsx
import { useEffect, useState } from "react"
import { fetchMenu, addCartItem } from "../lib/api"

export default function MenuPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchMenu()
        setItems(res.data || [])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  async function handleAdd(id) {
    try {
      await addCartItem(id, 1)
      alert("Added")
    } catch {
      alert("Failed to add")
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {items.map(i => (
          <li key={i._id}>
            {i.name} — {i.price}{" "}
            <button onClick={() => handleAdd(i._id)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

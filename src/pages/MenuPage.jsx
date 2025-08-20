import { useEffect, useState } from "react"
import { fetchMenu, addCartItem } from "../lib/api"
import ProductCard from "../components/ProductCard"

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
      alert("Added to cart")
    } catch (e) {
      console.error(e?.response || e)
      alert("Failed to add")
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <ProductCard item={item} onAdd={handleAdd} />
          </li>
        ))}
      </ul>
    </div>
  )
}

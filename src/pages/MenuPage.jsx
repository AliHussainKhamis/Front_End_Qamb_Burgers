import "./styles1.css"

import { useEffect, useState } from "react"
import { fetchMenu, addCartItem } from "../lib/api"
import ProductCard from "../components/ProductCard.jsx"

export default function MenuPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMenu()
      .then(res => setItems(res.data || []))
      .finally(() => setLoading(false))
  }, [])

  async function handleAdd(id) {
    try { await addCartItem(id, 1); alert("Added to cart") }
    catch { alert("Failed to add") }
  }

  return (
    <>
      <div className="filter-bar">
        <h3 className="mb-2">Our Menu</h3>
        <div className="filter-categories">
          <button className="filter-category active">All</button>
          <button className="filter-category">Burgers</button>
          <button className="filter-category">Sides</button>
          <button className="filter-category">Drinks</button>
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <section className="photo-grid">
          {items.map(item => (
            <ProductCard key={item._id} item={item} onAdd={handleAdd} />
          ))}
        </section>
      )}
    </>
  )
}
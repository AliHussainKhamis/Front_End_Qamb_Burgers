// Cart Page

import "./styles1.css"

import { useEffect, useMemo, useState } from "react"
import { fetchCart, fetchMenu, addCartItem, removeCartLine, clearCart } from "../lib/api"

export default function CartPage() {
  const [cart, setCart] = useState(null)
  const [menu, setMenu] = useState([])

  useEffect(() => { reload() }, [])
  async function reload() {
    const [c, m] = await Promise.all([fetchCart(), fetchMenu()])
    setCart(c.data)
    setMenu(m.data || [])
  }

  const map = useMemo(() => {
    const m = {}; for (let i=0;i<menu.length;i++) m[menu[i]._id] = menu[i]; return m
  }, [menu])

  async function plus(line) { await addCartItem(line.menuItem, 1); reload() }
  async function minus(line) {
    if (line.quantity <= 1) await removeCartLine(line._id)
    else { await removeCartLine(line._id); await addCartItem(line.menuItem, line.quantity-1) }
    reload()
  }
  async function removeLine(id) { await removeCartLine(id); reload() }
  async function clearAll() { await clearCart(); reload() }

  if (!cart) return <p className="text-center">Loading...</p>

  let subtotal = 0
  for (let i=0;i<(cart.items?.length||0);i++) {
    const line = cart.items[i]
    const info = map[line.menuItem] || { price:0, name:"Unknown", imageUrl:"" }
    subtotal += (info.price||0) * (line.quantity||1)
  }

  return (
    <section className="filter-bar">
      <h3 className="mb-3">Your Cart</h3>
      {cart.items?.length ? (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.items.map(line => {
              const info = map[line.menuItem] || { name: "Unknown", price: 0, imageUrl: "" }
              return (
                <li key={line._id} className="mb-3">
                  {info.imageUrl ? <img src={info.imageUrl} alt={info.name} width="80" style={{ verticalAlign: "middle", marginRight: 8 }} /> : null}
                  <strong>{info.name}</strong> — ${info.price} × {line.quantity}{" "}
                  <button onClick={() => minus(line)} className="mt-2">-</button>{" "}
                  <button onClick={() => plus(line)} className="mt-2">+</button>{" "}
                  <button onClick={() => removeLine(line._id)} className="mt-2">Remove</button>
                </li>
              )
            })}
          </ul>
          <div className="mt-4"><strong>Subtotal: ${subtotal.toFixed(2)}</strong></div>
          <button className="mt-3" onClick={clearAll}>Clear</button>
        </>
      ) : (
        <p>Empty</p>
      )}
    </section>
  )
}
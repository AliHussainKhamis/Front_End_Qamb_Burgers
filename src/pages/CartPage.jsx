// src/pages/CartPage.jsx
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

  const priceMap = useMemo(() => {
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

  if (!cart) return <p>Loading...</p>

  let subtotal = 0
  for (let i=0;i<(cart.items?.length||0);i++) {
    const line = cart.items[i]
    const info = priceMap[line.menuItem] || { price:0, name:"Unknown" }
    subtotal += (info.price||0) * (line.quantity||1)
  }

  return (
    <div>
      <h2>Cart</h2>
      {cart.items?.length ? (
        <ul>
          {cart.items.map(line => {
            const info = priceMap[line.menuItem] || { name:"Unknown", price:0, imageUrl:"" }
            return (
              <li key={line._id} style={{ listStyle:"none" }}>
                {info.imageUrl ? <img src={info.imageUrl} alt={info.name} width="80"/> : null}
                {info.name} — {info.price} × {line.quantity}{" "}
                <button onClick={() => minus(line)}>-</button>
                <button onClick={() => plus(line)}>+</button>
                <button onClick={() => removeLine(line._id)}>Remove</button>
              </li>
            )
          })}
        </ul>
      ) : <p>Empty</p>}
      <div>Subtotal: {subtotal.toFixed(2)}</div>
      <button onClick={clearAll} disabled={!cart.items?.length}>Clear</button>
    </div>
  )
}

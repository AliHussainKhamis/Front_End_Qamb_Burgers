// src/pages/CartPage.jsx
import { useEffect, useMemo, useState } from "react"
import { fetchCart, removeCartLine, clearCart, fetchMenu, addCartItem } from "../lib/api"

function mapMenu(arr) {
  const m = {}
  for (let i = 0; i < (arr?.length || 0); i++) {
    const it = arr[i]
    m[it._id] = { name: it.name, price: it.price }
  }
  return m
}

export default function CartPage() {
  const [cart, setCart] = useState(null)
  const [menu, setMenu] = useState([])
  const mm = useMemo(() => mapMenu(menu), [menu])

  async function load() {
    const [c, m] = await Promise.all([fetchCart(), fetchMenu()])
    setCart(c.data)
    setMenu(m.data || [])
  }

  useEffect(() => { load() }, [])

  async function plus(line) {
    await addCartItem(line.menuItem, 1)
    load()
  }

  async function minus(line) {
    if (line.quantity <= 1) {
      await removeCartLine(line._id)
    } else {
      // beginner approach: delete line then re-add with quantity-1
      await removeCartLine(line._id)
      await addCartItem(line.menuItem, line.quantity - 1)
    }
    load()
  }

  async function removeLine(lineId) {
    await removeCartLine(lineId)
    load()
  }

  async function clearAll() {
    await clearCart()
    load()
  }

  if (!cart) return <p>Loading cart...</p>

  let subtotal = 0
  for (let i = 0; i < (cart.items?.length || 0); i++) {
    const line = cart.items[i]
    const info = mm[line.menuItem] || { price: 0 }
    subtotal += (info.price || 0) * (line.quantity || 1)
  }

  return (
    <div>
      <h2>Cart</h2>
      {cart.items?.length ? (
        <ul>
          {cart.items.map(line => {
            const info = mm[line.menuItem] || { name: "Unknown", price: 0 }
            return (
              <li key={line._id}>
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

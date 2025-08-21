// Checkout

import "./styles1.css"

import { useEffect, useMemo, useState } from "react"
import { fetchCart, fetchMenu, createOrder, clearCart } from "../lib/api"

function build(cart, menu) {
  const map = {}; for (let i = 0; i < menu.length; i++) map[menu[i]._id] = { name: menu[i].name, price: menu[i].price }
  const items = []; for (let i = 0; i < (cart?.items?.length || 0); i++) {
    const line = cart.items[i]
    const info = map[line.menuItem] || { name: "Unknown", price: 0 }
    items.push({ name: info.name, price: info.price, qty: line.quantity || 1 })
  }
  return items
}

export default function CheckoutPage() {
  const [cart, setCart] = useState(null)
  const [menu, setMenu] = useState([])

  useEffect(() => {
    Promise.all([fetchCart(), fetchMenu()]).then(([c, m]) => {
      setCart(c.data); setMenu(m.data || [])
    })
  }, [])

  const items = useMemo(() => build(cart, menu), [cart, menu])

  async function place() {
    if (!items.length) return alert("Cart empty")
    let total = 0; for (let i = 0; i < items.length; i++) total += items[i].price * items[i].qty
    try {
      const res = await createOrder({ items, total })
      alert("Order placed: " + res.data._id)
      await clearCart()
    } catch (e) {
      alert("Order failed")
    }
  }

  if (!cart) return <p className="text-center">Loading...</p>

  return (
    <section className="filter-bar">
      <h3 className="mb-3">Checkout</h3>
      {items.map((it, idx) => (
        <div key={idx} className="mb-2">
          {it.name} × {it.qty} = ${(it.price * it.qty).toFixed(2)}
        </div>
      ))}
      <button className="mt-3" onClick={place}>Place Order</button>
    </section>
  )
}
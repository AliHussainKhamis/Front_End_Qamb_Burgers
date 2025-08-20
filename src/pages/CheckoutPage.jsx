// src/pages/CheckoutPage.jsx
import { useEffect, useMemo, useState } from "react"
import { fetchCart, fetchMenu, createOrder, clearCart } from "../lib/api"

function build(cart, menu) {
  const map = {}
  for (let i = 0; i < (menu?.length || 0); i++) {
    const m = menu[i]
    map[m._id] = { name: m.name, price: m.price }
  }
  const items = []
  for (let i = 0; i < (cart?.items?.length || 0); i++) {
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
      setCart(c.data)
      setMenu(m.data || [])
    })
  }, [])

  const items = useMemo(() => build(cart, menu), [cart, menu])

  async function place() {
    if (!items.length) return alert("Cart empty")
    let total = 0
    for (let i = 0; i < items.length; i++) total += items[i].price * items[i].qty
    try {
      const res = await createOrder({ items, total })
      alert("Order placed: " + res.data._id)
      await clearCart()
    } catch (e) {
      console.error(e?.response || e)
      alert("Order failed: " + (e?.response?.data?.message || e.message))
    }
  }

  if (!cart) return <p>Loading...</p>

  return (
    <div>
      <h2>Checkout</h2>
      {items.map((it, idx) => (
        <div key={idx}>
          {it.name} x {it.qty} = {(it.price * it.qty).toFixed(2)}
        </div>
      ))}
      <button onClick={place}>Place Order</button>
    </div>
  )
}

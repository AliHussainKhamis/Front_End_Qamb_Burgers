
import { useEffect, useState } from "react"
import { listOrders } from "../lib/api"

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listOrders().then(res => setOrders(res.data||[])).finally(()=>setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>
  if (!orders.length) return <p>No orders yet</p>

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map(o => (
          <li key={o._id} style={{ listStyle:"none" }}>
            #{o._id} — {new Date(o.createdAt).toLocaleString()}
            <div>
              {o.items?.map((it, idx) => (
                <div key={idx}>{it.name} x {it.qty} = {(it.price*it.qty).toFixed(2)}</div>
              ))}
            </div>
            <strong>Total: {Number(o.total).toFixed(2)}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

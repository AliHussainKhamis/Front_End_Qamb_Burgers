import { useEffect, useState } from 'react'
import { listOrders } from '../lib/api'

function OrdersPage() {
  const [rows, setRows] = useState([])

  async function load() {
    const res = await listOrders()
    setRows(res.data || [])
  }

  useEffect(() => { load() }, [])

  return (
    <div>
      <h2>Orders</h2>
      {rows.length ? rows.map(o => (
        <div key={o._id}>
          <div>id: {o._id}</div>
          <div>user: {o.user}</div>
          <div>total: {o.total}</div>
        </div>
      )) : <p>No orders</p>}
    </div>
  )
}
export default OrdersPage

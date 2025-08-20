function OrderSummary({ items }) {
  let total = 0
  for (let i = 0; i < items.length; i++) {
    const it = items[i]
    total += (Number(it.price) || 0) * (Number(it.qty) || 0)
  }
  return (
    <div>
      <h3>Summary</h3>
      {items.map((it, idx) => (
        <div key={idx}>
          {it.name} x {it.qty} = {(it.price * it.qty).toFixed(2)}
        </div>
      ))}
      <div>Total: {total.toFixed(2)}</div>
    </div>
  )
}
export default OrderSummary

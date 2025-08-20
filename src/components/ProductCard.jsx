function ProductCard({ item, onAdd }) {
  return (
    <div>
      <div>{item.name}</div>
      <div>{item.price}</div>
      <button onClick={() => onAdd(item._id)}>Add</button>
    </div>
  )
}
export default ProductCard

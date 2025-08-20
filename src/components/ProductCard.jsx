// src/components/ProductCard.jsx
export default function ProductCard({ item, onAdd }) {
  return (
    <div>
      {item.imageUrl ? <img src={item.imageUrl} alt={item.name} width="160" height="120" /> : null}
      <div>{item.name}</div>
      {item.description ? <div>{item.description}</div> : null}
      <div>{Number(item.price).toFixed(2)}</div>
      <button onClick={() => onAdd(item._id)}>Add</button>
    </div>
  )
}




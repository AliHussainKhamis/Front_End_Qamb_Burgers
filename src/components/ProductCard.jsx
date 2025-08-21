export default function ProductCard({ item, onAdd }) {
  return (
    <article className="photo-item">
      {item.imageUrl ? (
        <img src={item.imageUrl} alt={item.name} className="photo-placeholder" style={{ objectFit: "cover" }} />
      ) : (
        <div className="photo-placeholder">No image</div>
      )}
      <div className="photo-content">
        <div className="photo-title">{item.name}</div>
        {item.description ? <p className="photo-description mb-2">{item.description}</p> : null}
        <div className="mb-3"><strong>${Number(item.price).toFixed(2)}</strong></div>
        <button onClick={() => onAdd(item._id)}>Add</button>
      </div>
    </article>
  )
}
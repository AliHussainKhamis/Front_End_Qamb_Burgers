import { useState } from "react"
import { uploadImage, createMenuItem } from "../lib/api"

export default function AdminCreateMenuItem() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: ""
  })
  const [file, setFile] = useState(null)
  const [busy, setBusy] = useState(false)

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.price) return alert("name and price required")
    if (!file) return alert("pick an image file")

    setBusy(true)
    try {
      // 1) upload the image to get a URL
      const up = await uploadImage(file)
      const imageUrl = up.data.url

      // 2) create the menu item with that URL
      const payload = {
        name: form.name,
        price: Number(form.price),
        description: form.description,
        category: form.category,
        imageUrl
      }
      const res = await createMenuItem(payload)
      alert("Menu created: " + res.data._id)

      // reset
      setForm({ name: "", price: "", description: "", category: "" })
      setFile(null)
    } catch (err) {
      console.error(err?.response || err)
      alert("Failed: " + (err?.response?.data?.message || err.message))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <h2>Create Menu Item</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input name="name" placeholder="name" value={form.name} onChange={onChange} />
        </div>
        <div>
          <input name="price" type="number" step="0.01" placeholder="price" value={form.price} onChange={onChange} />
        </div>
        <div>
          <input name="category" placeholder="category" value={form.category} onChange={onChange} />
        </div>
        <div>
          <textarea name="description" placeholder="description" value={form.description} onChange={onChange} />
        </div>
        <div>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>
        <button type="submit" disabled={busy}>{busy ? "Saving..." : "Create"}</button>
      </form>
    </div>
  )
}

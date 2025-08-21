import "./styles1.css"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate()
  function handleOrderNow() { navigate("/menu") }

  return (
    <>
      <section className="hero-section">
        <div className="hero-image-placeholder" />
        <div className="hero-text">
          <h1>Welcome to Qamb Burgers</h1>
          <p>Fresh, juicy, made with love.</p>
          <button onClick={handleOrderNow} style={{ marginTop: "16px" }}>Order Now</button>
        </div>
      </section>

      <section className="filter-bar">
        <h3 className="mb-3">About Us</h3>
        <p className="photo-description">
          At Qamb Burgers, we serve delicious, handcrafted burgers with the best ingredients.
        </p>
      </section>

      <section className="photo-grid">
        <article className="photo-item">
          <div className="photo-placeholder">Classic Burger</div>
          <div className="photo-content">
            <div className="photo-title">Classic Burger</div>
            <p className="photo-description">Beef patty, lettuce, tomato, secret sauce.</p>
          </div>
        </article>
        <article className="photo-item">
          <div className="photo-placeholder">Cheese Melt</div>
          <div className="photo-content">
            <div className="photo-title">Cheese Melt</div>
            <p className="photo-description">Double cheese on a flame-grilled patty.</p>
          </div>
        </article>
        <article className="photo-item">
          <div className="photo-placeholder">BBQ Burger</div>
          <div className="photo-content">
            <div className="photo-title">BBQ Burger</div>
            <p className="photo-description">Smoky BBQ sauce, crispy onions, cheddar.</p>
          </div>
        </article>
      </section>
    </>
  )
}
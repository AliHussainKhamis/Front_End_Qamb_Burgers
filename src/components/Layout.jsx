import "./styles.css"

import { Outlet, Link, useNavigate, useLocation } from "react-router-dom"
import { clearToken, getToken } from "../lib/auth"

export default function Layout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const loggedIn = !!getToken()

  function onLogout() {
    clearToken()
    navigate("/login")
  }

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-nav">
          <div className="sidebar-brand">
            <h1>Qamb Burgers</h1>
          </div>
          <ul className="sidebar-nav-links">
            <li>
              <Link className={pathname === "/" ? "active" : ""} to="/">Home</Link>
            </li>
            <li>
              <Link className={pathname.startsWith("/menu") ? "active" : ""} to="/menu">Menu</Link>
            </li>
            <li>
              <Link className={pathname.startsWith("/cart") ? "active" : ""} to="/cart">Cart</Link>
            </li>
            <li>
              <Link className={pathname.startsWith("/checkout") ? "active" : ""} to="/checkout">Checkout</Link>
            </li>
            <li>
              <Link className={pathname.startsWith("/orders") ? "active" : ""} to="/orders">Orders</Link>
            </li>
            <li>
              <Link className={pathname.startsWith("/admin/new-menu") ? "active" : ""} to="/admin/new-menu">
                New Item
              </Link>
            </li>
            <li>
              {loggedIn ? (
                <button onClick={onLogout}>Logout</button>
              ) : (
                <Link className={pathname.startsWith("/login") ? "active" : ""} to="/login">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-brand">burgerhouse © {new Date().getFullYear()}</div>
            <div className="footer-team">MADE W LOVE BY QAMB TEAM</div>
          </div>
        </footer>
      </main>
    </>
  )
}

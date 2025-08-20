// src/components/Layout.jsx
import { Outlet, Link, useNavigate } from "react-router-dom"
import { clearToken, getToken } from "../lib/auth"

export default function Layout() {
  const navigate = useNavigate()
  const loggedIn = !!getToken()

  function handleLogout() {
    clearToken()
    navigate("/login")
  }

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>{" | "}
        <Link to="/menu">Menu</Link>{" | "}
        <Link to="/cart">Cart</Link>{" | "}
        <Link to="/checkout">Checkout</Link>{" | "}
        <Link to="/orders">Orders</Link>{" | "}
        {!loggedIn ? (
          <>
            <Link to="/login">Login</Link>{" | "}
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </nav>
      <Outlet />
    </div>
  )
}

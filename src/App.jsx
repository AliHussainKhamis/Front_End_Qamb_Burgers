// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"

import HomePage from "./pages/HomePage.jsx"
import MenuPage from "./pages/MenuPage.jsx"
import CartPage from "./pages/CartPage.jsx"
import CheckoutPage from "./pages/CheckoutPage.jsx"
import OrdersPage from "./pages/OrdersPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* optionally show a public home */}
        <Route path="/" element={<Navigate to="/menu" />} />

        {/* protected */}
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <MenuPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

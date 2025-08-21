// src/lib/api.js
import axios from "axios"
import { getToken, getUserId } from "./auth"

const baseURL = import.meta.env.VITE_BACKEND_URL
const api = axios.create({ baseURL })

//
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}` 
  return config
})
//

// AUTH
export function signup({ username, password }) {
  return api.post("/api/auth/signup", { username, password })
}
export function login({ username, password }) {
  return api.post("/api/auth/login", { username, password })
}

// MENU
export function fetchMenu() {
  return api.get("/api/menu")
}

// create menu item
export function createMenuItem(data) {
  // data = { name, price, description, category, imageUrl }
  return api.post("/api/menu", data)
}
// upload image 
export function uploadImage(file) {
  const fd = new FormData()
  fd.append("image", file)
  return api.post("/api/upload", fd) 
}

// Cart
export function fetchCart() {
  const uid = getUserId()
  return api.get(`/api/cart/${uid}`)
}
export function addCartItem(menuItemId, quantity = 1) {
  const uid = getUserId()
  return api.post(`/api/cart/${uid}/items`, { menuItemId, quantity })
}
export function removeCartLine(lineId) {
  const uid = getUserId()
  return api.delete(`/api/cart/${uid}/items/${lineId}`)
}
export function clearCart() {
  const uid = getUserId()
  return api.delete(`/api/cart/${uid}`)
}


export function createOrder(payload) {
  return api.post(`/api/order`, payload)
}
export function listOrders() {
  return api.get(`/api/order`)
}


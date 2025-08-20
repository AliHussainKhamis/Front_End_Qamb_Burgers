// src/lib/auth.js
import { jwtDecode } from "jwt-decode"

const KEY = "token"

export function setToken(t) {
  localStorage.setItem(KEY, t)
}

export function getToken() {
  return localStorage.getItem(KEY) || null
}

export function clearToken() {
  localStorage.removeItem(KEY)
}

export function getUserId() {
  const t = getToken()
  if (!t) return null
  try {
    const decoded = jwtDecode(t) 
    return decoded?.id || null
  } catch {
    return null
  }
}

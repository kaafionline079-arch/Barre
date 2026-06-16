export function getApiUrl(path: string) {
  const cleanPath = path.replace(/^\/api\//, "").replace(/^\//, "")
  return `/api/${cleanPath}`
}

export function getAuthToken() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("auth-token")
}

export function setAuthToken(token: string) {
  localStorage.setItem("auth-token", token)
}

export function removeAuthToken() {
  localStorage.removeItem("auth-token")
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getAuthToken()
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  }
  if (token) headers.Authorization = `Bearer ${token}`

  return fetch(getApiUrl(path), { ...options, headers })
}

// src/auth/SSOCallback.tsx

import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"

export default function SSOCallback() {
  return <AuthenticateWithRedirectCallback />
}
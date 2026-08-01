import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import "./styles/index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/ui/theme-provider.tsx"
import SmoothScroll from "@/components/shared/SmoothScroll.tsx"

// ClerkProvider is mounted per-route by ClerkGate rather than here, so pages
// that never touch auth do not download the Clerk SDK.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SmoothScroll>
          <App />
        </SmoothScroll>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
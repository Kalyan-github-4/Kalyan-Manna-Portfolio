import Footer from "./components/layout/Footer"
import Home from "@/pages/Home"
import GlowHorizonPage from "@/pages/GlowHorizonPage"
import { Navigate, Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Footer />
            </>
          }
        />
        <Route path="/glow-horizon" element={<GlowHorizonPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  )
}

export default App

import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import GuestBook from "./components/guestbook/Guestbook"
import BucketList from "./components/bucketList/BucketList"
import Links from "./components/links/Links"
import Uses from "./components/uses/UsesPage"
import Attribution from "./components/attribution/Attribution"

function App() {
  return (
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/guestbook" element={<GuestBook />} />
  <Route path="/bucket-list" element={<BucketList />} />
  <Route path="/links" element={<Links />} />
  <Route path="/uses" element={<Uses />} />
  <Route path="/attribution" element={<Attribution />} />
</Routes>
  )
}

export default App

import { Routes, Route } from "react-router-dom"

import RootLayout from "./RootLayout"
import Home from "./pages/Home"
import About from "./pages/About"
import Work from "./pages/Work"
import Blog from "./pages/Blog"
import GuestBook from "./pages/Guestbook"
import BucketList from "./pages/BucketList"
import Links from "./pages/Links"
import Uses from "./pages/Uses"
import Attribution from "./pages/Attribution"

import Contact from "./components/contact/Contact"

import SignIn from "./auth/SignIn"
import SignUp from "./auth/SignUp"
import SSOCallback from "./auth/SSOCallback"

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="work" element={<Work />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
        <Route path="more/guestbook" element={<GuestBook />} />
        <Route path="more/guestbook/sign-in" element={<SignIn />} />
        <Route path="more/guestbook/sign-up" element={<SignUp />} />
        <Route path="more/guestbook/sso-callback" element={<SSOCallback />} />

        <Route path="more/bucket-list" element={<BucketList />} />
        <Route path="more/links" element={<Links />} />
        <Route path="more/uses" element={<Uses />} />
        <Route path="more/attribution" element={<Attribution />} />
      </Route>
    </Routes>
  )
}

export default App
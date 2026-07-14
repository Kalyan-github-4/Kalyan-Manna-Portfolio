import { Routes, Route } from "react-router-dom"

import RootLayout from "./RootLayout"
import Home from "./pages/Home"
import About from "./pages/About"
import Work from "./pages/Work"
// import Highlights from "./pages/Highlights"
import GuestBook from "./pages/Guestbook"
import BucketList from "./pages/BucketList"
import Links from "./pages/Links"
import Uses from "./pages/Uses"
import Attribution from "./pages/Attribution"
// import Privacy from "./pages/Privacy"
// import Terms from "./pages/Terms"
import Contact from "./components/contact/Contact"

import SignIn from "./auth/SignIn"
import SignUp from "./auth/SignUp"
import SSOCallback from "./auth/SSOCallback"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="work" element={<Work />} />
        <Route path="highlights" element={<main className="relative min-h-screen overflow-hidden bg-black text-white">
          <section className="relative flex min-h-screen items-center justify-center px-4 text-center">
            <p className="uppercase max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base md:text-lg md:leading-8">
              This page is under construction. Please check back later for
              updates!
            </p>
          </section>
        </main>} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<main className="relative min-h-screen overflow-hidden bg-black text-white">
      <section className="relative flex min-h-screen items-center justify-center px-4 text-center">
          <p className="uppercase max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base md:text-lg md:leading-8">
            This page is under construction. Please check back later for
            updates!
          </p>
      </section>
    </main>} />
        <Route path="terms" element={<main className="relative min-h-screen overflow-hidden bg-black text-white">
      <section className="relative flex min-h-screen items-center justify-center px-4 text-center">
          <p className="uppercase max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base md:text-lg md:leading-8">
            This page is under construction. Please check back later for
            updates!
          </p>
      </section>
    </main>} />

        <Route path="more/guestbook" element={<GuestBook />} />
        <Route path="more/guestbook/sign-in" element={<SignIn />} />
        <Route path="more/guestbook/sign-up" element={<SignUp />} />
        <Route path="more/guestbook/sso-callback" element={<SSOCallback />} />

        <Route path="more/bucket-list" element={<BucketList />} />
        <Route path="more/links" element={<Links />} />
        <Route path="more/uses" element={<Uses />} />
        <Route path="more/attribution" element={<Attribution />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
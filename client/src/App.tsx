import { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"

import RootLayout from "./RootLayout"
import ClerkGate from "./auth/ClerkGate"
import EdgeStripes from "./components/shared/EdgeStripes"

// Every route is split out so a visitor landing on the home page downloads the
// home page — not the WebGL globe on the 404, the Cal.com embed on /contact, or
// the guestbook's auth stack.
const Home = lazy(() => import("./pages/Home"))
const About = lazy(() => import("./pages/About"))
const Work = lazy(() => import("./pages/Work"))
const Vault = lazy(() => import("./pages/Vault"))
const VaultCollection = lazy(() => import("./components/vault/VaultCollection"))
const GuestBook = lazy(() => import("./pages/Guestbook"))
const BucketList = lazy(() => import("./pages/BucketList"))
const Links = lazy(() => import("./pages/Links"))
const Uses = lazy(() => import("./pages/Uses"))
const Attribution = lazy(() => import("./pages/Attribution"))
const Contact = lazy(() => import("./components/contact/Contact"))
const Privacy = lazy(() => import("./components/privacy/privacy"))

const SignIn = lazy(() => import("./auth/SignIn"))
const SignUp = lazy(() => import("./auth/SignUp"))
const SSOCallback = lazy(() => import("./auth/SSOCallback"))
const NotFound = lazy(() => import("./pages/NotFound"))

// Its own chunk for a reason: three.js plus drei is the heaviest bundle in the
// project, and only this route pays for it.
const Robot = lazy(() => import("./pages/Robot"))

function UnderConstruction() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <section className="relative flex min-h-screen items-center justify-center px-4 text-center">
        <EdgeStripes />

        <p className="relative z-10 max-w-2xl text-sm uppercase leading-7 text-zinc-400 sm:text-base md:text-lg md:leading-8">
          This page is under construction. Please check back later for updates!
        </p>
      </section>
    </main>
  )
}

// Deliberately blank: the routes paint fast enough that a spinner would be a
// flash of noise, and a full-height box keeps the layout from jumping.
function RouteFallback() {
  return <div className="min-h-screen bg-black" />
}

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* Outside RootLayout on purpose — the robot hero brings its own
            navbar and owns the full viewport. */}

        <Route element={<RootLayout />}>
          <Route path="robot" element={<Robot />} />
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="work" element={<Work />} />
          <Route path="vault" element={<Vault />} />
          <Route path="vault/:slug" element={<VaultCollection />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<UnderConstruction />} />

          {/* The only routes that mount Clerk. */}
          <Route
            path="more/guestbook"
            element={
              <ClerkGate fallback={<RouteFallback />}>
                <GuestBook />
              </ClerkGate>
            }
          />
          <Route
            path="more/guestbook/sign-in"
            element={
              <ClerkGate fallback={<RouteFallback />}>
                <SignIn />
              </ClerkGate>
            }
          />
          <Route
            path="more/guestbook/sign-up"
            element={
              <ClerkGate fallback={<RouteFallback />}>
                <SignUp />
              </ClerkGate>
            }
          />
          <Route
            path="more/guestbook/sso-callback"
            element={
              <ClerkGate fallback={<RouteFallback />}>
                <SSOCallback />
              </ClerkGate>
            }
          />

          <Route path="more/bucket-list" element={<BucketList />} />
          <Route path="more/links" element={<Links />} />
          <Route path="more/uses" element={<Uses />} />
          <Route path="more/attribution" element={<Attribution />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App

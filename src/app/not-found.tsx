import SiteChrome from "@/components/layout/SiteChrome"
import NotFoundPage from "@/views/NotFound"

/**
 * Sits at the app root so it catches URLs that match no segment at all. That
 * puts it outside the (site) group, so it pulls in the chrome itself to keep
 * the navbar and footer the catch-all route had under React Router.
 */
export default function NotFound() {
  return (
    <SiteChrome>
      <NotFoundPage />
    </SiteChrome>
  )
}

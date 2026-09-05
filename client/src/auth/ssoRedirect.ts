/**
 * Clerk's OAuth redirect target, read lazily.
 *
 * This used to be a module-scope `const` in each of the three files that need
 * it. Under Vite that was fine — the module only ever ran in a browser. Under
 * Next every "use client" component is still prerendered on the server first,
 * where `window` does not exist, so touching it at import time crashes the
 * route before it can render. A function defers the read to the click handler,
 * which only ever runs in the browser.
 */
export function getSsoCallbackUrl() {
  return `${window.location.origin}/more/guestbook/sso-callback`
}

export const SSO_COMPLETE_URL = "/more/guestbook"

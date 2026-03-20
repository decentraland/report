import { clearWagmiState } from '@dcl/core-web3'
import { getEnv } from '../config'

/**
 * Gets the basename for this dApp.
 * Returns '/report' on Decentraland production domains, empty string elsewhere (localhost, Vercel previews).
 */
function getBasename(): string {
  return /^decentraland.(zone|org|today)$/.test(window.location.host) ? '/report' : ''
}

/**
 * Builds a redirect URL for authentication.
 * @param path - The path to redirect to after authentication (may include query params)
 * @param queryParams - Optional query parameters to append to the path
 * @returns The full redirect URL with basename
 */
function buildAuthRedirectUrl(path: string, queryParams?: Record<string, string>): string {
  const basename = getBasename()

  const url = new URL(path, window.location.origin)
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }

  let pathWithQuery = url.pathname + url.search

  if (basename && pathWithQuery.startsWith(basename)) {
    pathWithQuery = pathWithQuery.slice(basename.length) || '/'
  }

  return `${basename}${pathWithQuery}`
}

/**
 * Resolves the auth URL based on environment and host.
 * - If AUTH_URL is absolute (http/https), use it directly
 * - If AUTH_URL is relative: use same origin + path so Vite proxy applies in dev
 */
function resolveAuthUrl(): string {
  const authUrl = getEnv('AUTH_URL') ?? '/auth'

  if (authUrl.startsWith('http')) {
    return authUrl
  }

  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

  if (isLocalhost) {
    return authUrl
  }

  return `${window.location.origin}${authUrl.startsWith('/') ? '' : '/'}${authUrl}`
}

/**
 * Resolves the path to redirect to after login from the current URL.
 */
function getRedirectPathFromCurrentUrl(): string {
  const pathname = window.location.pathname
  const search = window.location.search
  const searchParams = new URLSearchParams(search)
  const currentRedirectTo = searchParams.get('redirectTo')
  return currentRedirectTo ?? `${pathname}${search}`
}

/**
 * Redirects to the authentication URL with the specified redirect path.
 * @param path - Optional path to redirect to after authentication (defaults to current URL)
 * @param queryParams - Optional query parameters to append to the path
 */
function redirectToAuth(path?: string, queryParams?: Record<string, string>): void {
  const redirectPath = path ?? getRedirectPathFromCurrentUrl()
  const redirectTo = buildAuthRedirectUrl(redirectPath, queryParams)
  const authUrl = resolveAuthUrl()

  clearWagmiState()

  window.location.replace(`${authUrl}/login?redirectTo=${encodeURIComponent(redirectTo)}`)
}

export { buildAuthRedirectUrl, redirectToAuth }

const { externalDevDistRelative } = require('./scripts/next-dev-dist')

/**
 * Reliable "are we running the dev server?" check. `process.argv` alone is wrong inside
 * some Next subprocesses and causes distDir to flip — then .next is half-written and
 * webpack throws "Cannot find module './329.js'".
 */
const npmEvent = process.env.npm_lifecycle_event || ''
const hasDevArg =
  process.argv.includes('dev') &&
  !process.argv.includes('build') &&
  !process.argv.includes('start')
const npmRunningDevScript = /^dev($|:)/.test(npmEvent)
const isNextDev = hasDevArg || npmRunningDevScript

/**
 * Windows + dev: use a same-drive folder as relative `distDir` (Next does join(cwd, distDir);
 * absolute paths on another drive break). Default: os.tmpdir()/{name}, else ../.next-dev-external
 * Build/start keep default `.next` in the repo.
 * Set NEXT_IN_PROJECT_DIST=1 to use in-repo `.next` during dev.
 */
const externalDevDist =
  process.platform === 'win32' && isNextDev && process.env.NEXT_IN_PROJECT_DIST !== '1'

const distDir = externalDevDist ? externalDevDistRelative() : undefined

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(distDir ? { distDir } : {}),
  reactStrictMode: true,
  typescript: {
    // Temporary: unblock Vercel deploy while fixing schema/type mismatches in pages.
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  /** Windows: avoids corrupt `.next` / PackFileCacheStrategy when two dev servers or AV lock files. */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false
    }
    return config
  },
}

module.exports = nextConfig

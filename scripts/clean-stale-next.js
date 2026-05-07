/**
 * Remove in-repo `.next` on Windows when dev uses external distDir, so a leftover
 * folder from a mis-evaluated config or `next build` cannot be mixed with the real cache.
 */
const fs = require('fs')
const path = require('path')

if (process.platform !== 'win32') {
  process.exit(0)
}
if (process.env.NEXT_IN_PROJECT_DIST === '1') {
  process.exit(0)
}

const stale = path.join(process.cwd(), '.next')
try {
  fs.rmSync(stale, { recursive: true, force: true })
} catch (err) {
  console.warn('clean-stale-next:', err.message)
}

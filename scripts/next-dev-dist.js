/**
 * Determines the Next.js distDir for Windows dev:
 *  - Must be on the same drive as the project (Next does path.join(cwd, distDir))
 *  - Must be OUTSIDE C:\xampp\htdocs to avoid Apache/XAMPP file-locking (errno -4094)
 *  - Must have junctions for node_modules so server-side requires resolve correctly.
 */
const path = require('path')
const os = require('os')
const fs = require('fs')
const { execSync } = require('child_process')

const CACHE_NAME = 'babies-todds-daycare-next'

function sameDrive(a, b) {
  try {
    return path.parse(path.resolve(a)).root === path.parse(path.resolve(b)).root
  } catch {
    return false
  }
}

/**
 * Returns the distDir path.
 * We use C:\.next-dev-babies to get as far away from XAMPP as possible while staying on C:.
 */
function externalDevDistAbsolute(projectRoot = process.cwd()) {
  const root = path.resolve(projectRoot)
  
  // Try C:\.next-dev-babies first if we are on C:
  const preferred = 'C:\\.next-dev-babies'
  if (sameDrive(root, 'C:\\')) {
    return path.join(preferred, CACHE_NAME)
  }

  // Fallback to tmpdir if same drive
  const tmpCache = path.join(os.tmpdir(), CACHE_NAME)
  if (sameDrive(root, tmpCache)) return path.resolve(tmpCache)

  // Last resort
  return path.resolve(root, '..', '.next-dev-cache', CACHE_NAME)
}

/** Relative distDir for next.config.js */
function externalDevDistRelative(projectRoot = process.cwd()) {
  return path.relative(path.resolve(projectRoot), externalDevDistAbsolute(projectRoot))
}

/**
 * Creates junctions at multiple levels inside distDir.
 * Uses 'cmd /c rmdir' to safely remove junctions without following them.
 */
function ensureNodeModulesJunction(projectRoot = process.cwd()) {
  if (process.platform !== 'win32') return
  const root = path.resolve(projectRoot)
  const distAbs = externalDevDistAbsolute(root)
  const junctionTarget = path.join(root, 'node_modules')

  if (!fs.existsSync(junctionTarget)) {
    console.warn('[next-dev-dist] Source node_modules not found!')
    return
  }

  const junctionParents = [
    distAbs,
    path.join(distAbs, 'server'),
    path.join(distAbs, 'server', 'pages'),
    path.join(distAbs, 'server', 'chunks'),
    path.join(distAbs, 'server', 'app'),
  ]

  for (const parent of junctionParents) {
    const junctionLink = path.join(parent, 'node_modules')
    try {
      if (!fs.existsSync(parent)) fs.mkdirSync(parent, { recursive: true })

      if (fs.existsSync(junctionLink)) {
        // Safe check and removal
        const stat = fs.lstatSync(junctionLink)
        if (stat.isSymbolicLink() || stat.isDirectory()) {
          try {
            const real = fs.realpathSync(junctionLink)
            if (real === path.resolve(junctionTarget)) continue 
          } catch {}
          // Use rmdir to remove the link only
          execSync(`cmd /c rmdir "${junctionLink}"`, { stdio: 'ignore' })
        }
      }

      execSync(`cmd /c mklink /J "${junctionLink}" "${junctionTarget}"`, { stdio: 'ignore' })
    } catch (err) {
      console.warn(`[next-dev-dist] Failed junction at ${parent}: ${err.message}`)
    }
  }
}

module.exports = {
  externalDevDistAbsolute,
  externalDevDistRelative,
  ensureNodeModulesJunction,
}

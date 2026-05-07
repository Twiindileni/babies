/**
 * Next.js always does path.join(projectDir, config.distDir). On Windows, an absolute
 * distDir (e.g. D:\... while the project is on C:\) becomes a broken path. Use a
 * same-drive directory and pass distDir as relative to the project root.
 */
const path = require('path')
const os = require('os')

const CACHE_NAME = 'babies-todds-daycare-next'

function sameDrive(a, b) {
  return path.parse(path.resolve(a)).root === path.parse(path.resolve(b)).root
}

/** Resolved absolute folder for external dev output (Windows dev only). */
function externalDevDistAbsolute(projectRoot = process.cwd()) {
  const root = path.resolve(projectRoot)
  const tmpCache = path.join(os.tmpdir(), CACHE_NAME)
  if (sameDrive(root, tmpCache)) {
    return path.resolve(tmpCache)
  }
  return path.resolve(root, '..', '.next-dev-external')
}

/** Value for next.config.js `distDir` when using external dev output. */
function externalDevDistRelative(projectRoot = process.cwd()) {
  return path.relative(path.resolve(projectRoot), externalDevDistAbsolute(projectRoot))
}

/** Absolute paths to delete on full clean (includes legacy ~/.cache location). */
function dirsToClean(projectRoot = process.cwd()) {
  const root = path.resolve(projectRoot)
  const set = new Set([
    path.join(root, '.next'),
    path.join(os.homedir(), '.cache', CACHE_NAME),
    path.join(root, '..', '.next-dev-external'),
    path.join(os.tmpdir(), CACHE_NAME),
    externalDevDistAbsolute(root),
    path.join(root, 'node_modules', '.cache'),
  ])
  return [...set]
}

module.exports = {
  externalDevDistAbsolute,
  externalDevDistRelative,
  dirsToClean,
}

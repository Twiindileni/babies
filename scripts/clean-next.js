/**
 * Remove local Next output dirs (project + Windows dev external cache + legacy paths).
 */
const fs = require('fs')
const { dirsToClean } = require('./next-dev-dist')

for (const dir of dirsToClean()) {
  try {
    fs.rmSync(dir, { recursive: true, force: true })
    console.log('Removed:', dir)
  } catch {
    // ignore
  }
}

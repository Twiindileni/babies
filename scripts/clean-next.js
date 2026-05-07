/**
 * Remove local Next output dirs (project + optional Windows external cache).
 */
const fs = require('fs')
const path = require('path')
const os = require('os')

const dirs = [
  path.join(process.cwd(), '.next'),
  path.join(os.homedir(), '.cache', 'babies-todds-daycare-next'),
]

for (const dir of dirs) {
  try {
    fs.rmSync(dir, { recursive: true, force: true })
    console.log('Removed:', dir)
  } catch {
    // ignore
  }
}

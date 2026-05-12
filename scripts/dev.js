/**
 * Wrapper to run `next dev` with NODE_PATH pointing to the project's node_modules.
 * This allows the external distDir (outside htdocs) to resolve modules like 'react'.
 *
 * Usage: node scripts/dev.js [--turbo]
 */
const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const root = process.cwd()
const nodeModulesPath = path.join(root, 'node_modules')
const binPath = path.join(nodeModulesPath, '.bin')

// Merge NODE_PATH
const existingNodePath = process.env.NODE_PATH || ''
const separator = process.platform === 'win32' ? ';' : ':'
const newNodePath = existingNodePath
  ? `${nodeModulesPath}${separator}${existingNodePath}`
  : nodeModulesPath

// Add node_modules/.bin to PATH so 'next' command is found
const existingPath = process.env.PATH || ''
const newPath = `${binPath}${separator}${existingPath}`

const args = process.argv.slice(2).join(' ')

// Check if next exists
const nextCmd = process.platform === 'win32' ? 'next.cmd' : 'next'
const nextPath = path.join(binPath, nextCmd)

if (!fs.existsSync(nextPath)) {
  console.error(`Error: ${nextPath} not found. Run npm install first.`)
  process.exit(1)
}

console.log(`Starting next dev with NODE_PATH...`)

try {
  execSync(`"${nextPath}" dev ${args}`, {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_PATH: newNodePath,
      PATH: newPath,
    },
    cwd: root,
  })
} catch (err) {
  if (err.status !== null && err.status !== 0) {
    process.exit(err.status)
  }
}

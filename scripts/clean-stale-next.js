const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const root = process.cwd()

/**
 * TRULY safe recursive remove for Windows.
 * If it encounters a junction or symlink, it removes the link ONLY.
 */
function safeRmdirRecursive(dirPath) {
  if (!fs.existsSync(dirPath)) return

  // IMPORTANT: If the dirPath ITSELF is a junction, don't recurse!
  if (isJunctionOrLink(dirPath)) {
    removeLink(dirPath)
    return
  }

  const files = fs.readdirSync(dirPath)
  for (const file of files) {
    const curPath = path.join(dirPath, file)
    const stat = fs.lstatSync(curPath)

    if (isJunctionOrLink(curPath)) {
      removeLink(curPath)
    } else if (stat.isDirectory()) {
      safeRmdirRecursive(curPath)
    } else {
      try { fs.unlinkSync(curPath) } catch {}
    }
  }
  
  try { fs.rmdirSync(dirPath) } catch {}
}

function isJunctionOrLink(p) {
  try {
    const stat = fs.lstatSync(p)
    if (stat.isSymbolicLink()) return true
    
    // On Windows, junctions are directories where readlink succeeds
    if (process.platform === 'win32' && stat.isDirectory()) {
      try {
        fs.readlinkSync(p)
        return true
      } catch {
        return false
      }
    }
  } catch {
    return false
  }
  return false
}

function removeLink(p) {
  try {
    if (process.platform === 'win32') {
      // rmdir removes junctions/symlinks to directories safely
      execSync(`cmd /c rmdir "${p}"`, { stdio: 'ignore' })
    } else {
      fs.unlinkSync(p)
    }
  } catch (e) {
    try { fs.unlinkSync(p) } catch {}
  }
}

const targets = [
  path.join(root, '.next'),
  path.join(root, '.next-dev'),
  path.join(root, '..', '.next-dev-external'),
  path.join(root, '..', '..', '.next-dev-cache'),
  'C:\\.next-dev-babies'
]

console.log('Cleaning up build folders safely...')
for (const t of targets) {
  if (fs.existsSync(t)) {
    console.log(`- ${t}`)
    safeRmdirRecursive(t)
  }
}
console.log('Done.')

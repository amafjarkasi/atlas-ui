/**
 * Release preview — shows exactly what would be published for @atlas/ui
 * without touching the workspace (the dev package keeps its src exports).
 *
 * Run:  bun run release:preview   (after bun run build:ui)
 *
 * Real publish (requires npm auth):
 *   cd packages/ui && npm publish --access public
 *   (first publish: npm login + registry scope, add "repository", consider
 *    provenance/CI signing, then drop "private": true via the publish flow)
 */
import { readFileSync, statSync, readdirSync, existsSync, cpSync, rmSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const ui = 'packages/ui'
const dist = join(ui, 'dist')
if (!existsSync(dist)) {
  console.error('dist/ missing — run `bun run build:ui` first.')
  process.exit(1)
}

const pkg = JSON.parse(readFileSync(join(ui, 'package.json'), 'utf8'))

const SUBPATHS = ['tokens', 'icons', 'atoms', 'overlays', 'layout', 'inputs', 'effects', 'display', 'dataviz', 'ai', 'finance', 'hooks', 'core', 'composites', 'desktop']

const exportsMap = {
  '.': { types: './dist/index.d.ts', default: './dist/index.js' },
}
for (const s of SUBPATHS) {
  exportsMap[`./${s}`] = { types: `./dist/${s}/index.d.ts`, default: `./dist/${s}/index.js` }
}

const manifest = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  keywords: pkg.keywords,
  license: pkg.license,
  type: 'module',
  main: './dist/index.js',
  module: './dist/index.js',
  types: './dist/index.d.ts',
  exports: exportsMap,
  files: ['dist', 'assets', 'README.md', 'COMPONENTS.md', 'LICENSE'],
  sideEffects: false,
  engines: { node: '>=18' },
  peerDependencies: pkg.peerDependencies,
  publishConfig: { access: 'public' },
}

function size(p) {
  return statSync(p).size
}
function walk(dir) {
  return readdirSync(dir, { recursive: true })
    .map((f) => String(f))
    .filter((f) => f.endsWith('.js') || f.endsWith('.d.ts') || f.endsWith('.map'))
}
const files = walk(dist)
const totalBytes = files.reduce((n, f) => n + size(join(dist, f)), 0)

console.log(`@atlas/ui@${pkg.version} — publish manifest preview`)
console.log('='.repeat(64))
console.log(JSON.stringify(manifest, null, 2))
console.log('='.repeat(64))
console.log(`dist files: ${files.length} (${(totalBytes / 1024).toFixed(1)} KiB)`)
console.log('shipping: dist/, README.md, COMPONENTS.md (LICENSE: MIT in manifest)')
console.log('\nNotes:')
console.log('  • JSX runtime + gpuix renderer come from the peer @gpuix/react.')
console.log('  • ESM/bundler-target output; keep @atlas/ui imports unchanged for the workspace.')
console.log('  • Next real steps: add "repository", bump version, `npm publish --access public`.')

// --pack: stage a real publishable folder and run `npm pack`.
if (process.argv.includes('--pack')) {
  const staging = join('.publish', '@atlas-ui')
  console.log('\nPacking into', staging, '…')
  rmSync('.publish', { recursive: true, force: true })
  mkdirSync(staging, { recursive: true })
  cpSync(dist, join(staging, 'dist'), { recursive: true })
  for (const f of ['README.md', 'COMPONENTS.md', 'LICENSE']) {
    cpSync(join(ui, f), join(staging, f))
  }
  cpSync(join(ui, 'assets'), join(staging, 'assets'), { recursive: true })
  writeFileSync(join(staging, 'package.json'), JSON.stringify(manifest, null, 2))
  // Prefer npm; fall back to `bun pm pack` when npm is not on PATH.
  const npmTry = spawnSync('npm', ['pack'], { cwd: staging, stdio: 'pipe', shell: true })
  let res = npmTry
  if (npmTry.status !== 0) {
    console.log('  (npm not found — using `bun pm pack`)')
    res = spawnSync(process.execPath, ['pm', 'pack'], { cwd: staging, stdio: 'inherit' })
  }
  if (res.status !== 0) {
    console.error('pack failed — install npm or run `bun pm pack` in .publish/@atlas-ui')
    process.exit(1)
  }
  const tar = readdirSync(staging).find((f) => f.endsWith('.tgz'))
  console.log(`\n✅ tarball: .publish/@atlas-ui/${tar} (${(statSync(join(staging, tar)).size / 1024).toFixed(1)} KiB)\n   install-test with:\n   bun add .publish/@atlas-ui/${tar} --no-save  (in a scratch project with @gpuix/react + react)`)
}

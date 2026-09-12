/**
 * Full runtime suite runner — runs every verify script sequentially and
 * reports a summary. Also guards the react/gpuix module-unification that the
 * runtime tests depend on (a fresh `bun install` can re-create divergent
 * copies under packages/ui/node_modules and break hooks at runtime).
 *
 * Run:  bun run test
 */
import { spawnSync } from 'node:child_process'
import { realpathSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const bun = process.argv[0]

function sameRealpath(pairs: [string, string][], label: string): boolean {
  let ok = true
  for (const [a, b] of pairs) {
    const okA = existsSync(a)
    const okB = existsSync(b)
    if (!okA || !okB) {
      console.log(`  ${label}: missing (${a} exists=${okA}, ${b} exists=${okB})`)
      ok = false
      continue
    }
    if (realpathSync(a) !== realpathSync(b)) {
      console.log(`  ${label}: DIVERGENT — ${realpathSync(a)}\n          vs ${realpathSync(b)}`)
      ok = false
    }
  }
  return ok
}

console.log('─ React/gpuix unification guard ─')
const unified = sameRealpath(
  [
    [join(root, 'node_modules', 'react'), join(root, 'packages', 'ui', 'node_modules', 'react')],
    [join(root, 'node_modules', '@gpuix', 'react'), join(root, 'packages', 'ui', 'node_modules', '@gpuix', 'react')],
    [join(root, 'node_modules', '@gpuix', 'native'), join(root, 'packages', 'ui', 'node_modules', '@gpuix', 'native')],
  ],
  'react/@gpuix',
)
if (!unified) {
  console.error('\nFAIL: module copies diverged — re-run the symlink unification (see TESTING.md) before testing.')
  process.exit(1)
}
console.log('  unified ✓\n')

// Build the distributable artifact so the dist suite tests shipped output.
console.log('─ Build packages/ui/dist ─')
const build = spawnSync(bun, ['run', 'build:ui'], { cwd: root, stdio: 'inherit' })
if (build.status !== 0) {
  console.error('\nFAIL: bun run build:ui failed — dist suite cannot run.')
  process.exit(1)
}
console.log('  built ✓\n')

const suites: { name: string; args: string[] }[] = [
  { name: 'dist', args: ['scripts/verify-dist.tsx'] },
  { name: 'render', args: ['scripts/verify-render.tsx'] },
  { name: 'tooltip', args: ['scripts/verify-tooltip.tsx'] },
  { name: 'gallery', args: ['scripts/verify-gallery.tsx'] },
  { name: 'interactions', args: ['scripts/verify-interactions.tsx'] },
  { name: 'virtual', args: ['scripts/verify-virtual.tsx'] },
  { name: 'dynamic', args: ['scripts/verify-dynamic.tsx'] },
  { name: 'ai', args: ['scripts/verify-ai.tsx'] },
]

let failedCount = 0
for (const s of suites) {
  process.stdout.write(`▶ ${s.name} … `)
  const res = spawnSync(bun, s.args, { cwd: root, stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8' })
  const tail = (res.stdout ?? '').split('\n').filter((l) => l.trim().length > 0).slice(-3).join(' ')
  if (res.status === 0) {
    console.log(`PASS (${tail})`)
  } else {
    failedCount += 1
    console.log(`FAIL`)
    console.log((res.stdout ?? '').split('\n').filter((l) => l.startsWith('FAIL:')).join('\n') || '  (no FAIL: lines; see stderr)')
    console.log((res.stderr ?? '').slice(-800))
  }
}

console.log(failedCount === 0 ? `\nALL SUITES PASSED (${suites.length}/${suites.length})` : `\n${failedCount} SUITE(S) FAILED`)
process.exit(failedCount === 0 ? 0 : 1)

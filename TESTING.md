# Runtime Testing (@atlas/ui)

Run everything with one command:

```
bun run test
```

`scripts/verify-all.ts` first runs a **module-unification guard** (react and
`@gpuix/*` must resolve to the same physical files from the repo root and from
`packages/ui` — otherwise every hook-using component crashes with
"Invalid hook call"), then executes each suite in order.

## Suites

| Suite | Proves |
|---|---|
| `verify-render.tsx` | The demo app renders on the real DirectX pipeline (baseline) |
| `verify-tooltip.tsx` | Styled `Tooltip` content paints; `PasswordField` masks; `FocusScope`/`TypeaheadInput`/`ShortcutRecorder` mount |
| `verify-gallery.tsx` | ~30 components compose and paint together; screenshot |
| `verify-interactions.tsx` | Click, pointer-drag (`usePointerDrag`), arrow-key handling, dialog open + Escape close |
| `verify-virtual.tsx` | 10k-row `VirtualList`: paint window stays ~57 rows, `onVisibleRange` reaches the end, scroll works |
| `verify-dynamic.tsx` | `StreamingText` reveals over real time; native `highlight` matches paint (`getPaintedHighlights`) |
| `verify-ai.tsx` | `MentionInput` suggestions, `AgentRunSteps` states, live `ChatThread` message append |

Screenshots land in `screenshots/`.

## Harness rules we learned (read before adding a suite)

1. **`getPaintedText()` returns fragments**, not whole lines — join with `''`
   and match substrings, or assert on fragments.
2. **An open overlay intercepts everything** — mount probes in phases or in
   separate mounts, never behind a full-screen dialog.
3. **Programmatic `focusElement` does not move real keyboard focus.**
   `simulateKeystrokes` reaches only elements focused through the real pipeline
   (`autoFocus` or a click). Dialog Escape works because overlays autoFocus.
4. **Character/line keys into `<textarea>`/`<input>` are not simulatable**
   (Enter is swallowed; no IME/text path). Verify such flows at the app level.
5. **`advanceTime` does not advance JS `setTimeout`/`setInterval`** — for
   timer-driven components, sleep real time (`await new Promise(r => setTimeout(r, ms))`).
6. **An invalid native prop silently drops the element** (no error): typecheck
   cannot catch it. Example: `Marker` passed `radius` inside `highlight`, which
   `HighlightSpec` doesn't define, and the whole text node vanished. Add a
   runtime mount whenever you touch native props (`highlight`, tabIndex, etc.).
7. **Native mouse APIs:** `nativeSimulateMouseDown/Move/Up(x, y, button)`
   (move + button press = drag; hover first). `getElementBounds(id)` →
   `[x, y, w, h]`.

## If "Invalid hook call" comes back

A fresh `bun install` can re-install divergent copies of `react` /
`@gpuix/react` / `@gpuix/native` under `packages/ui/node_modules` (bun's `.bun`
store) while the app resolves the real directories. Fix by repointing the
workspace symlinks at the root copies:

```powershell
$root = (Resolve-Path "node_modules\react").Path
Remove-Item "packages\ui\node_modules\react" -Force
New-Item -ItemType SymbolicLink -Path "packages\ui\node_modules\react" -Target $root
# repeat for @gpuix/react and @gpuix/native, then `bun run test`
```

The guard at the top of `bun run test` will fail loudly if it ever regresses.

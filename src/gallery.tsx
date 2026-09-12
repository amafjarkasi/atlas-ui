/**
 * Interactive gallery window — `bun run gallery`
 * Renders the full grouped component tree in a real GPUIX window for visual review.
 */
import { render } from '@gpuix/react'
import { GalleryTree } from './gallery-tree'

const isEntryPoint =
  typeof Bun !== 'undefined'
    ? (Bun as any).isStandaloneExecutable || (Bun as any).main === (import.meta as any).path
    : typeof process !== 'undefined' && process.argv[1]?.endsWith('gallery.tsx')

if (isEntryPoint) {
  render(<GalleryTree />, {
    title: 'atlas/ui — component gallery',
    appName: 'atlas/ui',
    width: 1280,
    height: 900,
    windowBackground: 'opaque',
  })
}

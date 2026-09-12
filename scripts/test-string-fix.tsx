import { createTestRoot } from '@gpuix/react/testing'
import { MailApp } from '../src/app'

const { render, renderer } = createTestRoot()
render(<MailApp />)
renderer.flush()

const noraNode = renderer.findByTestId('thread-nora')
if (noraNode) {
  const bounds = renderer.getElementBounds(noraNode.id)
  if (bounds) {
    renderer.nativeSimulateClick(bounds[0] + bounds[2] / 2, bounds[1] + bounds[3] / 2)
    renderer.flush()
    const elements = renderer.findByType('text')
    for (const el of elements) {
      if (el.text && (el.text.includes('conversation') || el.text.includes('between'))) {
        console.log('Found text element:', el, 'Bounds:', renderer.getElementBounds(el.id))
      }
    }
  }
}

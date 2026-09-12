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
    
    // Find DirectHeader elements
    const elements = renderer.findByType('text')
    for (const el of elements) {
      if (el.text && (el.text.includes('conversation') || el.text.includes('between') || el.text.includes('Desk'))) {
        console.log('Text element ID:', el.id, 'Text:', JSON.stringify(el.text), 'Bounds:', renderer.getElementBounds(el.id))
      }
    }
  }
}

import { createTestRoot } from '@gpuix/react/testing'
import { MailApp } from '../src/app'

const { render, renderer } = createTestRoot()
render(<MailApp />)
renderer.flush()

const noraNode = renderer.findByTestId('thread-nora')
if (noraNode) {
  const bounds = renderer.getElementBounds(noraNode.id)
  if (bounds) {
    const [x, y, w, h] = bounds
    renderer.nativeSimulateClick(x + w / 2, y + h / 2)
    renderer.flush()
    const allText = renderer.getAllText()
    console.log('All text in tree after selecting Nora:')
    console.log(allText.filter((t: string) => t.includes('conversation') || t.includes('between') || t.includes('Nora')))
  }
}

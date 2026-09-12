import { createTestRoot } from '@gpuix/react/testing'
import { MailApp } from '../src/app'

const { render, renderer } = createTestRoot()
render(<MailApp />)
renderer.flush()

const noraNode = renderer.findByTestId('thread-nora')
console.log('noraNode id:', noraNode?.id)
if (noraNode) {
  const bounds = renderer.getElementBounds(noraNode.id)
  console.log('noraNode bounds:', bounds)
  if (bounds) {
    const [x, y, w, h] = bounds
    renderer.nativeSimulateClick(x + w / 2, y + h / 2)
    renderer.flush()
    renderer.captureScreenshot('screenshots/verify-nora-selected.png')
    const allText = renderer.getAllText()
    console.log('Has DirectHeader text after click?', allText.some((t: string) => t.includes('This conversation is only between')))
  }
}

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
    
    // Look at text node 414 and its siblings/parent
    const el414 = renderer.getElement(414)
    console.log('el414:', el414)
    if (el414?.parentId) {
      const parent = renderer.getElement(el414.parentId)
      console.log('parent of 414:', parent)
      console.log('children of parent:', parent?.children.map(id => renderer.getElement(id)))
      for (const childId of parent?.children ?? []) {
        console.log('Child', childId, 'bounds:', renderer.getElementBounds(childId))
      }
    }
  }
}

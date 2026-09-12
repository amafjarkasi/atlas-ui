import { createTestRoot } from '@gpuix/react/testing'
import { MailApp } from '../src/app'
import { mkdirSync, existsSync } from 'node:fs'

console.log('Initializing test renderer on DirectX...')
if (!existsSync('screenshots')) {
  mkdirSync('screenshots', { recursive: true })
}

const { render, renderer } = createTestRoot()
console.log('Mounting MailApp via createTestRoot render()...')
render(<MailApp />)

console.log('Flushing GPU pipeline...')
renderer.flush()

const screenshotPath = 'screenshots/atlas-weekly.png'
console.log(`Capturing GPU screenshot to ${screenshotPath}...`)
renderer.captureScreenshot(screenshotPath)

const allText = renderer.getAllText()
console.log(`Render complete! Retained text nodes: ${allText.length}`)
console.log('Sample text detected:')
console.log(allText.slice(0, 20).map(t => `  • "${t}"`).join('\n'))

const paintedText = renderer.getPaintedText()
console.log(`Painted text elements: ${paintedText.length}`)
process.exit(0)

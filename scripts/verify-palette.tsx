import { createTestRoot } from '@gpuix/react/testing'
import { MailApp } from '../src/app'

const { render, renderer } = createTestRoot()
console.log('Mounting MailApp with initialPaletteOpen=true...')
render(<MailApp initialPaletteOpen={true} />)
renderer.flush()
const screenshotPath = 'screenshots/palette-modal.png'
console.log('Capturing Command Palette screenshot to ' + screenshotPath + '...')
renderer.captureScreenshot(screenshotPath)

const allText = renderer.getAllText()
console.log('Palette dialog rendered! Text nodes: ' + allText.length)
const found = allText.filter((t: string) => t.includes('Type a command') || t.includes('Settings') || t.includes('Atlas Weekly'))
console.log('Matched palette text:', found)

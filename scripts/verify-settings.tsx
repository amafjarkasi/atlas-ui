import { createTestRoot } from '@gpuix/react/testing'
import { MailApp } from '../src/app'

const { render, renderer } = createTestRoot()
console.log('Mounting MailApp with initialSettingsOpen=true...')
render(<MailApp initialSettingsOpen={true} />)
renderer.flush()
const screenshotPath = 'screenshots/settings-modal.png'
console.log('Capturing Settings screenshot to ' + screenshotPath + '...')
renderer.captureScreenshot(screenshotPath)

const allText = renderer.getAllText()
console.log('Settings dialog rendered! Text nodes: ' + allText.length)
const foundSettings = allText.filter((t: string) => t.includes('Settings') || t.includes('Hardware') || t.includes('DirectX') || t.includes('Shortcuts') || t.includes('Accent'))
console.log('Matched settings text:', foundSettings)

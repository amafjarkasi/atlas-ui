import { createTestRoot } from '@gpuix/react/testing'
import { MailApp } from '../src/app'

const { render, renderer } = createTestRoot()
console.log('Mounting MailApp...')
render(<MailApp />)
renderer.flush()

console.log('Capturing default screenshot...')
renderer.captureScreenshot('screenshots/verify-default.png')

const allText = renderer.getAllText()
console.log('All text count:', allText.length)
console.log('Has DirectHeader text?', allText.some((t: string) => t.includes('This conversation is only between')))

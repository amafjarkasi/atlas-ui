import path from 'node:path'
import type { Channel, FaceSpec, MailThread } from './types'

const getAsset = (name: string) => path.resolve(process.cwd(), 'assets', name)

export const maraFace: FaceSpec = { src: getAsset('mara.jpg') }
export const noraFace: FaceSpec = { src: getAsset('nora.jpg') }
export const julesFace: FaceSpec = { src: getAsset('jules.jpg') }
export const kenjiFace: FaceSpec = { src: getAsset('kenji.jpg') }
export const leaFace: FaceSpec = { src: getAsset('lea.jpg') }
export const miraFace: FaceSpec = { src: getAsset('mira.jpg') }
export const atlasFace: FaceSpec = { src: getAsset('atlas.jpg') }

export const bannerSrc = getAsset('banner.jpg')

export const INITIAL_CHANNELS: Channel[] = [
  { id: 'primary', label: 'Primary', icon: 'user' },
  { id: 'promotions', label: 'Promotions', icon: 'tag' },
  { id: 'social', label: 'Social', icon: 'megaphone' },
  { id: 'updates', label: 'Updates', icon: 'message' },
  { id: 'forums', label: 'Forums', icon: 'filter' },
  { id: 'notifications', label: 'Notifications', icon: 'sparkle' },
]

export const INITIAL_THREADS: MailThread[] = [
  {
    id: 'nora',
    channelId: 'primary',
    senders: 'Nora Hale',
    subject: 'Desk notes',
    snippet: 'I parked the draft in the shared folder. Ping me when you want a pass.',
    date: 'Today',
    lastReplyAt: 1756900000000,
    unread: true,
    mentionCount: 1,
    faces: [noraFace],
    messages: [
      {
        id: 'no-1',
        from: 'Nora Hale',
        to: 'Mara',
        face: noraFace,
        time: 'Today',
        body: 'I parked the draft in the shared folder. Ping me when you want a pass.',
      },
    ],
  },
  {
    id: 'jules',
    channelId: 'primary',
    senders: 'Jules Park',
    subject: 'Re: Thursday',
    snippet: 'Re: Thursday',
    date: '12/08/2024',
    lastReplyAt: 1723420800000,
    unread: true,
    mentionCount: 1,
    faces: [julesFace],
    messages: [
      {
        id: 'ju-1',
        from: 'Jules Park',
        to: 'Mara',
        face: julesFace,
        time: '12/08/2024',
        body: 'Can we move Thursday to 4pm?',
      },
      {
        id: 'ju-2',
        from: 'You',
        to: 'Jules',
        face: maraFace,
        time: '12/08/2024',
        day: '13 Aug 2024',
        body: 'Re: Thursday - 4pm works fine.',
      },
    ],
  },
  {
    id: 'kenji',
    channelId: 'primary',
    senders: 'Kenji Ito',
    subject: 'Morning',
    snippet: 'Morning',
    date: 'Yesterday',
    lastReplyAt: 1723334400000,
    unread: false,
    faces: [kenjiFace],
    messages: [
      {
        id: 'ke-1',
        from: 'Kenji Ito',
        to: 'Mara',
        face: kenjiFace,
        time: 'Yesterday',
        body: 'Morning! Sent the latest metrics report over for review.',
      },
    ],
  },
  {
    id: 'atlas-weekly',
    channelId: 'primary',
    senders: 'Atlas, Mira, Kenji...',
    subject: 'Atlas Weekly',
    snippet: 'Atlas cut idle spend and shipped the routing board',
    date: 'Jul 30',
    lastReplyAt: 1722297600000,
    unread: false,
    mentionCount: 0,
    faces: [atlasFace, miraFace, kenjiFace, { letter: '8' }],
    messages: [
      {
        id: 'aw-1',
        from: 'Lea from Atlas',
        to: 'Mara',
        face: leaFace,
        time: '4w',
        day: 'Jul 30',
        body: 'Lea sent the weekly recap: routing board is live, idle spend is down 18%, and the studio sale runs through August 31.',
      },
      {
        id: 'aw-2',
        from: 'Mira Cole',
        to: 'Mara',
        face: miraFace,
        time: '4w',
        body: 'Seat usage dropped after the routing change. The full recap is in the thread.',
      },
      {
        id: 'aw-3',
        from: 'Lea from Atlas',
        to: 'Mara',
        face: leaFace,
        time: '4w',
        day: '2 Aug',
        body: `Northlight 4 and Harbor 2 are in the studio now. We also shipped a live grain shader, form spam filters, and nested folders on design pages.

### Northlight 4
This is the most reliable model we have run in-house. First drafts keep style, reuse parts, and land closer to the brief. In our bench it hits **81%**, ahead of the previous run at 74%.

\`\`\`yaml
model: northlight-4
context_window: 128k
latency_p90: 240ms
quality_score: 0.81
\`\`\``,
        image: bannerSrc,
        patch: `diff --git a/src/pipeline/shader.wgsl b/src/pipeline/shader.wgsl
index 3a4b5c6..7d8e9f0 100644
--- a/src/pipeline/shader.wgsl
+++ b/src/pipeline/shader.wgsl
@@ -12,6 +12,8 @@ struct Uniforms {
-    noise_octaves: u32,
-    roughness: f32,
+    noise_octaves: u32,
+    roughness: f32,
+    grain_intensity: f32,
+    temporal_jitter: f32,
 };
@@ -45,4 +47,6 @@ fn fragment_main(in: VertexOutput) -> @location(0) vec4<f32> {
-    return vec4<f32>(color.rgb, 1.0);
+    let grain = hash_noise(in.uv * 1280.0 + uniforms.temporal_jitter);
+    let blended = mix(color.rgb, color.rgb + (grain - 0.5) * uniforms.grain_intensity, 0.45);
+    return vec4<f32>(blended, 1.0);
 }`,
      },
    ],
  },
  {
    id: 'lea-july',
    channelId: 'primary',
    senders: 'Lea From Atlas, Mi...',
    subject: 'Atlas Weekly',
    snippet: 'New studio models and design notes from Atlas',
    date: 'Jul 8',
    lastReplyAt: 1720396800000,
    unread: true,
    faces: [leaFace, miraFace, { letter: 'T' }, { letter: '8' }],
    messages: [
      {
        id: 'lj-1',
        from: 'Lea from Atlas',
        to: 'Mara',
        face: leaFace,
        time: 'Jul 8',
        body: 'New studio models and design notes from Atlas. Northlight 4, Harbor 2, and the grain shader.',
      },
      {
        id: 'lj-2',
        from: 'Mira Cole',
        to: 'Mara',
        face: miraFace,
        time: 'Jul 8',
        body: 'Start with the grain shader. It is the one worth a demo.',
      },
    ],
  },
  {
    id: 'lighthouse',
    channelId: 'promotions',
    senders: 'Atlas, Lighthouse, ...',
    subject: 'Studio drop',
    snippet: 'Atlas is hosting a short studio drop next week...',
    date: 'Aug 5',
    lastReplyAt: 1722816000000,
    unread: false,
    faces: [atlasFace, { letter: 'L' }, { letter: 'T' }, { letter: '8' }],
    messages: [
      {
        id: 'lh-1',
        from: 'Atlas',
        face: atlasFace,
        time: 'Aug 5',
        body: 'Atlas is hosting a short studio drop next week. Reserve your slot now.',
      },
    ],
  },
  {
    id: 'welcome',
    channelId: 'promotions',
    senders: 'Atlas',
    subject: 'Welcome to Atlas',
    snippet: 'Welcome to Atlas. Here is how to get started',
    date: '01/10/2023',
    lastReplyAt: 1696118400000,
    unread: false,
    faces: [atlasFace],
    messages: [
      {
        id: 'we-1',
        from: 'Atlas',
        face: atlasFace,
        time: '01/10/2023',
        body: 'Welcome to Atlas. Here is how to get started with our collaborative studio workspaces.',
      },
    ],
  },
  {
    id: 'invite',
    channelId: 'social',
    senders: 'Mira, Atlas',
    subject: 'Workspace invite',
    snippet: 'You were invited to the Harbor workspace in Atlas',
    date: '03/11/2023',
    lastReplyAt: 1698969600000,
    unread: false,
    faces: [miraFace, atlasFace],
    messages: [
      {
        id: 'iv-1',
        from: 'Mira Cole',
        face: miraFace,
        time: '03/11/2023',
        body: 'You were invited to the Harbor workspace in Atlas. Click here to accept.',
      },
    ],
  },
  {
    id: 'year-review',
    channelId: 'updates',
    senders: 'Atlas, Northlight...',
    subject: '2024 year in review',
    snippet: 'Atlas 2024 year in review and highlights',
    date: '15/01/2025',
    lastReplyAt: 1736899200000,
    unread: false,
    faces: [atlasFace, { letter: 'N' }, { letter: 'T' }, { letter: '9' }],
    messages: [
      {
        id: 'yr-1',
        from: 'Atlas',
        face: atlasFace,
        time: '15/01/2025',
        body: 'Atlas 2024 year in review and highlights across model efficiency and rendering.',
      },
    ],
  },
  {
    id: 'lea-30',
    channelId: 'updates',
    senders: 'Lea From Atlas...',
    subject: 'Atlas weekly update',
    snippet: 'Atlas weekly update brings shared boards and design notes...',
    date: 'Aug 30',
    lastReplyAt: 1724976000000,
    unread: true,
    faces: [leaFace, { letter: 'J' }, { letter: 'J' }, { letter: '8' }],
    messages: [
      {
        id: 'la-1',
        from: 'Lea from Atlas',
        face: leaFace,
        time: 'Aug 30',
        body: 'Atlas weekly update brings shared boards and design notes.',
      },
    ],
  },
  {
    id: 'lea-29',
    channelId: 'updates',
    senders: 'Lea From Atlas, No...',
    subject: 'Atlas weekly notes',
    snippet: 'Atlas weekly notes cover boards and new design tools',
    date: 'Aug 29',
    lastReplyAt: 1724889600000,
    unread: false,
    faces: [kenjiFace, leaFace],
    messages: [
      {
        id: 'lb-1',
        from: 'Lea from Atlas',
        face: leaFace,
        time: 'Aug 29',
        body: 'Atlas weekly notes cover boards and new design tools.',
      },
    ],
  },
  {
    id: 'beta',
    channelId: 'updates',
    senders: 'Atlas Preview',
    subject: 'Preview access',
    snippet: 'You are on the Atlas preview list. Here is what ships next',
    date: '14/07/2023',
    lastReplyAt: 1689292800000,
    unread: false,
    faces: [atlasFace],
    messages: [
      {
        id: 'be-1',
        from: 'Atlas Preview',
        face: atlasFace,
        time: '14/07/2023',
        body: 'You are on the Atlas preview list. Here is what ships next in the rendering pipeline.',
      },
    ],
  },
  {
    id: 'harbor',
    channelId: 'forums',
    senders: 'Atlas',
    subject: 'Notes on Harbor',
    snippet: 'Notes on Harbor project parts in Atlas',
    date: '04/05/2025',
    lastReplyAt: 1746316800000,
    unread: true,
    faces: [atlasFace],
    messages: [
      {
        id: 'ha-1',
        from: 'Atlas',
        face: atlasFace,
        time: '04/05/2025',
        body: 'Notes on Harbor project parts in Atlas.',
      },
    ],
  },
  {
    id: 'parts',
    channelId: 'forums',
    senders: 'Lea From Atlas',
    subject: 'Part library',
    snippet: 'New part library updates for the Harbor project',
    date: '02/08/2023',
    lastReplyAt: 1690934400000,
    unread: false,
    faces: [leaFace],
    messages: [
      {
        id: 'pa-1',
        from: 'Lea from Atlas',
        face: leaFace,
        time: '02/08/2023',
        body: 'New part library updates for the Harbor project.',
      },
    ],
  },
  {
    id: 'invoice',
    channelId: 'notifications',
    senders: 'Atlas Billing',
    subject: 'December invoice',
    snippet: 'Your Atlas invoice for December is ready',
    date: '12/12/2023',
    lastReplyAt: 1702339200000,
    unread: true,
    faces: [atlasFace],
    messages: [
      {
        id: 'in-1',
        from: 'Atlas Billing',
        face: atlasFace,
        time: '12/12/2023',
        body: 'Your Atlas invoice for December is ready for download.',
      },
    ],
  },
  {
    id: 'sites',
    channelId: 'notifications',
    senders: 'Atlas, Sites',
    subject: 'Site published',
    snippet: 'Your published site is live. Share it with your team',
    date: '18/09/2023',
    lastReplyAt: 1694995200000,
    unread: false,
    faces: [atlasFace, { letter: 'S' }],
    messages: [
      {
        id: 'si-1',
        from: 'Atlas',
        face: atlasFace,
        time: '18/09/2023',
        body: 'Your published site is live. Share it with your team.',
      },
    ],
  },
  {
    id: 'security',
    channelId: 'notifications',
    senders: 'Atlas Security',
    subject: 'New login',
    snippet: 'A new login was detected on your Atlas account',
    date: '09/06/2023',
    lastReplyAt: 1686268800000,
    unread: true,
    faces: [{ letter: 'S' }],
    messages: [
      {
        id: 'se-1',
        from: 'Atlas Security',
        face: { letter: 'S' },
        time: '09/06/2023',
        body: 'A new login was detected on your Atlas account from Windows Direct3D.',
      },
    ],
  },
]

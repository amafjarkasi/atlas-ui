export type FaceSpec = {
  src?: string
  letter?: string
  logo?: boolean
  color?: string
}

export type Message = {
  id: string
  from: string
  to?: string
  face: FaceSpec
  time: string
  day?: string
  body: string
  image?: string
  patch?: string
}

export type MailThread = {
  id: string
  channelId: string
  senders: string
  subject: string
  snippet: string
  date: string
  lastReplyAt: number
  unread: boolean
  starred?: boolean
  archived?: boolean
  mentionCount?: number
  faces: FaceSpec[]
  messages: Message[]
}

export type Channel = {
  id: string
  label: string
  icon: string
  badge?: number
}

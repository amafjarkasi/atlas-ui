/** @atlas/ui — VersionFooter — app name · version · env chips for the status bar. */
import { text as t } from '../tokens'
import { FONT } from '../tokens'
import { Badge } from '../atoms/Badge'

export interface VersionFooterProps {
  appName?: string
  version?: string
  env?: 'dev' | 'prod' | 'beta' | string
}

export function VersionFooter({ appName, version, env }: VersionFooterProps) {
  const label = [appName, version].filter(Boolean).join(' ')
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      {label ? <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT }}>{label}</text> : null}
      {env ? <Badge variant="label" label={env} color={env === 'prod' ? '#22C55E' : env === 'beta' ? '#EAB308' : '#3B82F6'} /> : null}
    </div>
  )
}

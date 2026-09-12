/** @atlas/ui — VersionFooter — app name · version · env chips for the status bar. */
import { border, surface, text as t } from '../tokens'
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        backgroundColor: surface.card,
        borderWidth: 1,
        borderColor: border.subtle,
        alignSelf: 'flex-start',
      }}
    >
      {label ? <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT }}>{label}</text> : null}
      {env ? (
        <Badge
          variant="label"
          label={env}
          color={env === 'prod' ? '#22C55E' : env === 'beta' ? '#EAB308' : '#3B82F6'}
        />
      ) : null}
    </div>
  )
}

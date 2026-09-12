/**
 * @atlas/ui — AssetDetailPanel
 *
 * A holdings drill-down: asset list + balance/sparkline/candlestick/transactions
 * detail (composes `DetailPanel` + `BalanceCard` + `CandlestickChart` + `TransactionList`).
 *
 * @example
 *   <AssetDetailPanel assets={holdings} />
 */
import { useState } from 'react'
import { text } from '../tokens'
import { FONT } from '../tokens'
import { DetailPanel } from '../display/DetailPanel'
import { PnlBadge } from '../finance/PnlBadge'
import { BalanceCard } from '../finance/BalanceCard'
import { CandlestickChart, type Candle } from '../finance/CandlestickChart'
import { TransactionList, type Transaction } from '../finance/TransactionList'
import { Chart } from '../dataviz/Chart'

export interface AssetHolding {
  id: string
  name: string
  balance: number
  delta?: number
  sparkline: number[]
  candles?: Candle[]
  transactions?: Transaction[]
}

export interface AssetDetailPanelProps {
  assets: AssetHolding[]
  currency?: string
}

export function AssetDetailPanel({ assets, currency = '$' }: AssetDetailPanelProps) {
  const [selected, setSelected] = useState<AssetHolding | null>(null)

  return (
    <DetailPanel
      items={assets}
      selected={selected}
      onSelect={setSelected}
      getKey={(a) => a.id}
      renderItem={(a) => (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
          <text style={{ fontSize: 12.5, color: text.primary, fontFamily: FONT }}>{a.name}</text>
          <PnlBadge amount={a.delta ?? 0} currency={currency} />
        </div>
      )}
      renderDetail={(a) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <BalanceCard label={a.name} value={a.balance} delta={a.delta} data={a.sparkline} currency={currency} />
          {a.candles && a.candles.length > 0 ? (
            <Chart title="Price">
              <CandlestickChart data={a.candles} />
            </Chart>
          ) : null}
          {a.transactions && a.transactions.length > 0 ? <TransactionList transactions={a.transactions} currency={currency} /> : null}
        </div>
      )}
    />
  )
}

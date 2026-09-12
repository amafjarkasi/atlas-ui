/**
 * @atlas/ui — TransactionList
 *
 * A debit/credit ledger rendered with `DataGrid` (amounts colored by sign).
 *
 * @example
 *   <TransactionList transactions={[{ id: '1', name: 'Stripe payout', date: 'Aug 1', amount: 240.5 }]} />
 */
import { DataGrid } from '../display/DataGrid'
import { text } from '../tokens'
import { FONT } from '../tokens'

export interface Transaction {
  id: string
  name: string
  date: string
  amount: number
}

export interface TransactionListProps {
  transactions: Transaction[]
  currency?: string
}

export function TransactionList({ transactions, currency = '$' }: TransactionListProps) {
  const rows = transactions.map((t) => ({
    name: t.name,
    date: t.date,
    amount: (
      <text
        style={{
          fontSize: 12.5,
          color: t.amount >= 0 ? '#22C55E' : text.primary,
          fontFamily: FONT,
          textAlign: 'right',
        }}
      >
        {t.amount >= 0 ? '+' : '-'}
        {currency}
        {Math.abs(t.amount).toLocaleString()}
      </text>
    ),
  }))

  return (
    <DataGrid
      columns={[
        { key: 'name', title: 'Description' },
        { key: 'date', title: 'Date', width: 100 },
        { key: 'amount', title: 'Amount', width: 110, align: 'right' },
      ]}
      rows={rows}
    />
  )
}

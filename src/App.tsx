import { Transactions } from './pages/Transactions'
import './global.css'
import { TransactionProvider } from './contexts/TransactionsContext'

export function App() {
  return (
    <TransactionProvider>
      <Transactions />
    </TransactionProvider>
  )
}

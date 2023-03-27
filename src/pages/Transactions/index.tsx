import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { currencyFormatter } from '../../utils/formatters/currency'
import { dayFormatter } from '../../utils/formatters/date'
import { SearchForm } from './components/SearchForm'
import './style.css'

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => context.transactions)

  return (
    <div>
      <Header />
      <Summary />
      <SearchForm />

      <div className="table-container">
        <table>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="45%">{transaction.description}</td>
                <td data-transaction-type={transaction.type}>{`${transaction.type === 'income' ? '+' : '-'
                  } ${currencyFormatter.format(transaction.price)}`}</td>
                <td>{transaction.category}</td>
                <td>{dayFormatter.format(new Date(transaction.createdAt))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

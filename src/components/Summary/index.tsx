import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useSummary } from '../../hooks/useSummary'
import { currencyFormatter } from '../../utils/formatters/currency'

import './style.css'

export function Summary() {
  const summary = useSummary()

  return (
    <div className="summary-container">
      <div className="summary-item summary-income">
        <header>
          <span>Entradas</span>
          <img src={incomeImg} alt="" />
        </header>
        <strong>{currencyFormatter.format(summary.income)}</strong>
      </div>
      <div className="summary-item summary-outcome">
        <header>
          <span>Saídas</span>
          <img src={outcomeImg} alt="" />
        </header>
        <strong>{currencyFormatter.format(summary.outcome)}</strong>
      </div>
      <div className="summary-item summary-total">
        <header>
          <span>Total</span>
          <img src={totalImg} alt="" />
        </header>
        <strong>{currencyFormatter.format(summary.total)}</strong>
      </div>
    </div>
  )
}

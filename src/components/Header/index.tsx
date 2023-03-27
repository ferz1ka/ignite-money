import * as Dialog from '@radix-ui/react-dialog'
import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'
import './style.css'

export function Header() {
  return (
    <header className="header-container">
      <div className="header-content">
        <div className="header-logo">
          <img src={logoImg} alt="" />
          <span>Ignite Money</span>
        </div>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button>Nova transação</button>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </div>
    </header>
  )
}

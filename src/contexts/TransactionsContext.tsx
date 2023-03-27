import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

type Transaction = {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

type CreateTransactionType = {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

type TransactionsontextType = {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (transaction: CreateTransactionType) => Promise<void>
}

type TransactionProviderType = {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsontextType)

export function TransactionProvider({ children }: TransactionProviderType) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const createTransaction = useCallback(async (transaction: CreateTransactionType) => {
    const { description, price, category, type } = transaction

    const response = await api.post('/transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date().toISOString(),
    })

    setTransactions((prevTransactions) => [response.data, ...prevTransactions])
  }, [])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        q: query,
        _sort: 'createdAt',
        _order: 'desc',
      },
    })
    setTransactions(response.data)
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
